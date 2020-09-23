const { post } = require('../../models');
const { member_post } = require('../../models');
const { tag } = require('../../models');
const { post_tag } = require('../../models');

module.exports = {
  post: (req, res) => {
    //post 테이블 INSERT 함수
    const sess = req.session; //세션정보를 가져온다. 사용자가 로그인중인지 확인하기 위함
    const { names, categoryId, userId, message, title } = req.body; //게시글 작성시 요청 body에 있는 값을 가져온다

    // if (sess.userId) {
    if (true) {
      //사용자가 로그인중이라면
      post
        .create({
          categoryId: categoryId,
          userId: userId,
          message: message,
          title: title,
          view_count: 0,
        })
        .then((result) => {
          if (result) {
            //posts 테이블을 작성했다면 member_post 테이블 INSERT함수 실행
            if (insertMember_Post(result.dataValues.id, userId)) {
              // if (Array.isArray(names) && names.length !== 0) {
              //   //tag가 1개 이상이라도 array형태로 존재한다면
              //   insertTag(names, result.dataValues.id); //tag와 post_tag 테이블 INSERT함수 실행
              //   res.status(201).send(result);
              // } else {
              //   res.status(201).send(result);
              // }
              res.status(201).send(result);
            } else {
              res.status(400).send('Invalid Request');
            }
          } else {
            res.status(400).send('Invalid Request');
          }
        })
        .catch((e) => {
          res.status(500).send('Internal Server Error 1');
        });
    } else {
      //로그인 세션이 연결되어있지 않다면 홈으로
      res.redirect('/');
    }
  },
};

const insertMember_Post = (postId, userId) => {
  console.log('aAAAAAAAAAAAAAAAAA');
  //member_post 테이블 INSERT 함수
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

// const insertTag = (names, postId) => {
//   names.forEach((tagName) => {
//     tag
//       .findOrCreate({
//         where: {
//           name: tagName,
//         },
//       })
//       .spread((result, created) => {
//         if (!created) {
//           //tag가 이미 테이블에 존재한다면
//           post_tag.create({
//             postId: postId,
//             tagId: result.dataValues.id,
//           });
//         } else {
//           //tag가 테이블에 존재하지 않는다면
//           tag
//             .findOne({
//               where: {
//                 name: tagName,
//               },
//             })
//             .then((result2) => {
//               post_tag.create({
//                 postId: postId,
//                 tagId: result2.id,
//               });
//             })
//             .catch((e) => {
//               throw e;
//             });
//         }
//       })
//       .catch((e) => {
//         throw e;
//       });
//   });
// };
