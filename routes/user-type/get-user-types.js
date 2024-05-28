const { find } = require("../../helpers");
const express = require('express');
const mongoose = require('mongoose');
const { user } = require("../../models");

const getUserTypes = async (req, res) => {
  try {
    const users = await user.find({});
    if(!users || users.lenght === 0){
      return res.status(404).send({ status: 404, message: 'No User found.' });
    }
    return res.status(200).send({ status: 200, users });
  } catch (e) {
    res.status(400).send({ status: 400, message: e.message });
  }
};

module.exports = getUserTypes;
