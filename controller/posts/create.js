const { post } = require('../../models');
const { member_post } = require('../../models');
const { tag } = require('../../models');
const { post_tag } = require('../../models');

module.exports = {
  post: (req, res) => {
    //post 테이블 INSERT 함수
    const sess = req.session; //세션정보를 가져온다. 사용자가 로그인중인지 확인하기 위함
    const { names, categoryId, userId, message, title } = req.body; //게시글 작성시 요청 body에 있는 값을 가져온다

    if (sess.userId) {
      let isCreatePosts = false; //post.create가 성공했는지를 구분하기 위한 변수
      //사용자가 로그인중이라면
      post
        .create({
          categoryId: categoryId,
          userId: userId,
          message: message,
          title: title,
          viewCount: 0,
        })
        .then((result) => {
          if (result) {
            //posts 테이블을 작성했다면 member_posts 테이블 INSERT함수 실행
            if (insertMember_Post(result.dataValues.id, userId)) {
              isCreatePosts = true;
              //tag가 1개 이상이라도 array형태로 존재한다면
              if (Array.isArray(names) && names.length !== 0) {
                insertTag(names, result.dataValues.id); //tags와 post_tags 테이블 INSERT함수 실행
                res.status(201).send(result);
              } else {
                //tag를 쓰지 않았더라도 정상적으로 게시글 작성됨
                res.status(201).send(result);
              }
            } else {
              //
              res.status(400).send('Invalid Request');
            }
          } else {
            res.status(400).send('Invalid Request');
          }
        })
        .catch(() => {
          //posts와 memeber_posts 테이블이 작성된상태에서 에러가 났을 시
          if (isCreatePosts) {
            if (failToCreatePost(userId)) {
              //작성됬던 posts와 member_posts를 삭제
              res.status(500).send('Internal Server Error 11');
            } else {
              //작성됬던 posts와 member_posts삭제를 실패함
              res
                .status(500)
                .send('posts and member_posts table critical error 1');
            }
          } else {
            //posts insert자체에서 에러가 났을 시
            res.status(500).send('Internal Server Error 1');
          }
        });
    } else {
      //로그인 세션이 연결되어있지 않다면 홈으로
      res.redirect('/');
    }
  },
};

//post.create.then(여기서 오류가 났을 때 catch에서 실행될 함수)
const failToCreatePost = (userId) => {
  return post
    .max('id', {
      where: {
        userId: userId,
      },
    })
    .then((result) => {
      //max의 결과값인 result는 객체형태가 아니라 정확히 숫자로 나옴 ex)15
      post
        .destroy({
          //해당 유저가 작성한 post중 가장 최근(max(id))작성한 게시글을 삭제시킴, member_posts에 INSERT된 값도 자동삭제됨
          where: {
            id: result,
            userId: userId,
          },
        })
        .then(() => {
          return true;
        })
        .catch(() => {
          return false;
        });
    });
};

//member_posts 테이블 INSERT 함수
const insertMember_Post = (postId, userId) => {
  return member_post
    .create({
      postId: postId,
      userId: userId,
    })
    .then((result) => {
      if (result) {
        return true;
      }
    })
    .catch((e) => {
      return false;
    });
};

//tags 테이블 INSERT 함수
const insertTag = (names, postId) => {
  names.forEach((tagName) => {
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
  });
};
