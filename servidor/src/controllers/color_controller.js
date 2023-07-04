import Color from '../models/Color.js'

export const createColor = async (req, res) => {
    try {
      const color = new Color(req.body);
      await color.save();
      res.send(color);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  };

  export const getAllColors = async (req, res) => {
    try {
      const colors = await Color.find();
      res.json(colors);
    } catch (error) {
      console.log(error);
      res.status(500).send('Error');
    }
  };
  
  export const getColor = async (req, res) => {
    try {
      const color = await Color.findById(req.params.id);
      if (!color) {
        return res.status(404).send('Color not found');
      }
      res.json(color);
    } catch (error) {
      console.log(error);
      res.status(500).send('Error');
    }
  };
  
  export const updateColor = async (req, res) => {
    try {
      const { name, code } = req.body;
      let color = await Color.findById(req.params.id);
      if (!color) {
        return res.status(404).send('El color no existe');
      }
      color.name = name;
      color.code = code;  
      color = await Color.findOneAndUpdate({ _id: req.params.id }, color, { new: true });
      res.json(color);
    } catch (error) {
      console.log(error);
      res.status(500).send('Error');
    }
  };