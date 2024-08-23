const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const APIFeatures = require('../utils/apiFeatures');

exports.deleteOne = Model =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }

    res.status(204).json({
      status: 'successful deleted',
    });
  });

exports.updateOne = Model =>
  catchAsync(async (req, res, next) => {

    console.log({ rereq: req.body, params: req.params.id });

    // Correcting the data to match the schema
    const songData = {
      title: req.body.title,
      image: req.body.image,
      artist: req.body.singer, // Correct field name
      duration: parseFloat(req.body.duration.replace(':', '.')), // Convert duration to a number
      path: req.body.path
    };

    const update = {
      $push: { songs: songData }
    };

    const doc = await Model.findOneAndUpdate({ uniqueId: req.params.id }, update, {
      new: true,
      runValidators: true
    });

    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        data: doc
      }
    });
  });

exports.createOne = Model =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        data: doc
      }
    });
  });

exports.getOne = (Model) =>
  catchAsync(async (req, res, next) => {
    console.log(" uniqueId", req.params)
    let query
    if (req.params.id) {
      let uniqueId = req.params.id
      console.log(uniqueId)
      query = await Model.find({ _id:req.params.id });
    }
    console.log({query})

    if (!query) {
      console.log("No document found with that ID")
      return next(new AppError('No document found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        data: query
      }
    });
  });

exports.getAll = Model =>
  catchAsync(async (req, res, next) => {


    // To allow for nested GET reviews on tour (hack)
    let filter = {};
    if (req.params.tourId) filter = { tour: req.params.tourId };

    const features = new APIFeatures(Model.find(filter), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    // const doc = await features.query.explain();
    const doc = await features.query;
    console.log({ doc })
    // SEND RESPONSE
    res.status(200).json({
      status: 'success',
      results: doc.length,
      data: doc.data

    });
  });