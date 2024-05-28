const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../../models/user/user-schema');
const Joi = require('joi');
const { update } = require('../../models/user');
const { ObjectID } = require('../../types');
const { updateDocument } = require('../../helpers');
const { findOne } = require("../../helpers");
const schemaType = Joi.object({
    userId: ObjectID
    });

const updateBlacklistTypes = async (req, res) => {
  const userId = req.body.userId;

  try {
    const user = await findOne("user", { _id: userId });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    updateDocument("user", {_id:userId}, {isBlacklisted: !user.isBlacklisted});
    

    return res.status(200).json({ message: 'Blacklist status updated', isBlacklisted: user.isBlacklisted });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = updateBlacklistTypes;
