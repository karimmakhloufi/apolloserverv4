import WilderModel from "../models/Wilder";
import express from "express";

const controller = {
  create: (req: express.Request, res: express.Response): void => {
    WilderModel.init().then(() => {
      const wilder = new WilderModel(req.body);
      wilder
        .save()
        .then((result) => {
          res.status(201).json({ success: true, result: result });
        })
        .catch((error: any) => {
          res.status(400).json({ success: false, error: error });
        });
    });
  },
  read: (req: express.Request, res: express.Response): void => {
    WilderModel.find()
      .then((result) => {
        res.status(200).json({ success: true, result: result });
      })
      .catch((error: any) => {
        res.status(400).json({ success: false, error: error });
      });
  },

  update: (req: express.Request, res: express.Response): void => {
    WilderModel.findOneAndUpdate({ _id: req.params.id }, req.body, {
      new: true,
    })
      .then((result) => {
        res.status(200).json({ success: true, result: result });
      })
      .catch((error: any) => {
        res.status(400).json({ success: false, error: error });
      });
  },

  delete: (req: express.Request, res: express.Response): void => {
    WilderModel.findOneAndDelete({ _id: req.params.id })
      .then((result) => {
        res.status(200).json({ success: true, result: result });
      })
      .catch((error: any) => {
        res.status(400).json({ success: false, error: error });
      });
  },
};

export default controller;
