const { find, getPopulatedData } = require("../../helpers");
const express = require('express');
const mongoose = require('mongoose');

const getAdminTypes = async (req, res) => {
  try {
    const admin = await find('user', { role: 'admin' });
    console.log(admin);
    return res.status(200).send({ status: 200, admin });
  } catch (e) {
    res.status(400).send({ status: 400, message: e.message });
  }
};

module.exports = getAdminTypes;
