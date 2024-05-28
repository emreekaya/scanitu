const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const { insertNewDocument,findOne ,updateDocument} = require("../../helpers");
const Joi = require("joi");
const { ObjectID } = require("../../types");

const schema = Joi.object({
    friendId: Joi.string().required(),
});

const addFriend = async (req, res) => {

  const { userId, friendId } = await req.body;
  try {
    var friends = await findOne("friend", {userId: userId});
    var isFriendExist = await findOne("user", {userName: friendId});
    if(!isFriendExist){
        return res.status(400).send({ status: 400, message: "Friend ID is invalid" });
    }
    if(friends){
        var friendslist = friends.friendsId;
        if(friendslist.find(friend => friend == friendId)){
            return res.status(400).send({ status: 400, message: "Friend already added" });  
        }else
        {
            friendslist.push(friendId);
            var edittedFriend = await updateDocument("friend",{userId: userId},{friendsId:friendslist});
        }
    }else{
        const new_friend = {
          userId: userId,
          friendsId: [friendId]
        };
        const user = await insertNewDocument("friend", new_friend);
    }
    
    return res.status(200).send({ status: 200, message: "Friend added" });
  } catch (e) {
    return res.status(400).send({ status: 400, message: e.message });
  }
};

module.exports = addFriend;
