/* eslint-disable no-unused-vars */
const { post } = require('../../models');
const { tag } = require('../../models');
const { post_tag } = require('../../models');
const { member_post } = require('../../models');
const { user } = require('../../models');
const jwt = require('jsonwebtoken');
module.exports = {
  get: (req, res) => {
    const id = Number(req.params.id);
    post_tag
      .findAll({
        raw: true,
        where: {
          postId: id,
        },
        include: {
          model: tag,
          attributes: [['name', 'tag']],
        },
        attributes: [],
      })
      .then((result) => {
        const tagList = Object.values(result).map((ele) => ele['tag.tag']);

        member_post
          .findAll({
            raw: true,
            where: {
              postId: id,
            },
            include: {
              model: user,
              as: 'member',
              attributes: [['username', 'name']],
            },
            attributes: [],
          })
          .then((result) => {
            const memberList = Object.values(result).map(
              (ele) => ele['member.name']
            );
            res.status(200).send([tagList, memberList]);
          });
      });
  },

  post: (req, res) => {
    // const sess = req.session; //세션정보를 가져온다. 사용자가 로그인중인지 확인하기 위함
    const { token, id, names, tags, categoryId, message, title } = req.body; //게시글 작성시 요청 body에 있는 값을 가져온다
    const decoded = jwt.verify(
      token,
      process.env.ACCESS_SECRET + Date().split(' ')[2]
    );
    const email = decoded.account;
    const updatedPost = {
      //덮어씌울 게시글 정보
      categoryId: categoryId,
      message: message,
      title: title,
    };
    if (email) {
      post
        .findOne({
          where: {
            id: id,
          },
        })
        .then((findPost) => {
          user
            .findOne({
              where: {
                id: findPost.dataValues.authorId,
              },
            })
            .then((findUser) => {
              if (findUser.dataValues.email === email) {
                post
                  .update(updatedPost, {
                    //posts.id가 넘겨받은 id(수정하는 게시글의 id)인 게시글을 update
                    where: {
                      id: id,
                    },
                  })
                  .then(() => {
                    if (tags.length !== 0) {
                      //만약 tag를 1개이상 달았다면
                      if (deletePostTag(id)) {
                        //해당 게시글의 tag정보를 post_tags 테이블에서 제거 후
                        insertTag(tags, id); //새롭게 전달받은 tag로 insert
                      } else {
                        res.status(400).send('Invalid Request');
                      }
                    }
                    if (names.length !== 0) {
                      //만약 멤버를 1명이상 달았다면
                      if (deleteMemberPost(id)) {
                        //해당 게시글의 멤버정보를 member_posts 테이블에서 제거 후
                        insertMemberPost(names, id); //새롭게 전달받은 names(멤버들)로 insert
                      } else {
                        res.status(400).send('Invalid Request');
                      }
                    }
                    //응답
                    res.status(200).send('success to update post');
                  })
                  .catch((e) => {
                    res.sendStatus(500);
                  });
              } else {
                res.status(400).send('Invalid Request');
              }
            });
        })
        .catch((e) => {
          res.sendStatus(500);
        });
    } else {
      //로그인 세션이 연결되어있지 않다면 홈으로
      res.redirect('/');
    }
  },
};
//post_tags 테이블 삭제 함수
const deletePostTag = (postId) => {
  return post_tag
    .destroy({
      where: {
        postId: postId,
      },
    })
    .then(() => {
      return true;
    })
    .catch(() => {
      return false;
    });
};
//member_posts 테이블 삭제 함수
const deleteMemberPost = (postId) => {
  return member_post
    .destroy({
      where: {
        postId: postId,
      },
    })
    .then(() => {
      return true;
    })
    .catch(() => {
      return false;
    });
};
//tags 테이블 INSERT 함수
const insertTag = async (tags, postId) => {
  await tags.forEach((tagName) => {
    if (tagName) {
      tag
        .findOrCreate({
          where: {
            name: tagName,
          },
        })
        .then(([result, created]) => {
          if (!created) {
            //tag가 이미 테이블에 존재한다면
            post_tag.create({
              postId: postId,
              tagId: result.dataValues.id,
            });
          } else {
            //tag가 테이블에 존재하지 않는다면
            tag
              .findOne({
                where: {
                  name: tagName,
                },
              })
              .then((result2) => {
                post_tag.create({
                  postId: postId,
                  tagId: result2.id,
                });
              })
              .catch((e) => {
                throw e;
              });
          }
        })
        .catch((e) => {
          throw e;
        });
    }
  });
};
//names 테이블 INSERT 함수
const insertMemberPost = async (names, postId) => {
  await names.forEach((name) => {
    if (name) {
      user
        .findOne({
          raw: true,
          where: {
            username: name,
          },
        })
        .then((result) => {
          console.log('result===', result);
          member_post
            .create({
              postId: postId,
              memberId: result.id,
            })
            .then((result) => {
              if (result) console.log('succeed');
            })
            .catch((e) => {
              throw e;
            });
        });
    }
  });
};
