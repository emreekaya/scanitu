const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const {findOne ,updateDocument} = require("../../helpers");
const Joi = require("joi");
const { ObjectID } = require("../../types");

const schema = Joi.object({
    friendId: Joi.string().required(),
});

const deleteFriend = async (req, res) => {

  const { userId, friendId } = await req.body;
  try {
    var friends = await findOne("friend", {userId: userId});
    
    if(friends){
        var friendslist = friends.friendsId;
        if(friendslist.find(friend => friend == friendId)){
            let index = friendslist.indexOf(friendId);
            friendslist.splice(index, 1);
            var edittedFriend = await updateDocument("friend",{userId: userId},{friendsId:friendslist});
            
        }else
        {
            return res.status(400).send({ status: 400, message: "User not friend with the other" });  
        }
    }else{
        return res.status(400).send({ status: 400, message: "User have no friends :(" });
    }
    
    return res.status(200).send({ status: 200, message: "Friend deleted" });
  } catch (e) {
    return res.status(400).send({ status: 400, message: e.message });
  }
};

module.exports = deleteFriend;
