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
      const {page, limit, search, status} = req.query;
      const query = {};

      if (status === 'true' || status === 'false') {
        query.status = status === 'true';
      }

      if (search){
        query.name={ $regex: search, $options: 'i' };
      }
      const options = {
        page:parseInt(page,10) || 1,
        limit: parseInt(limit,10) || 10,
      }
      const result = await Color.paginate(query,options);
      res.json(result);
    } catch (error) {
      res.status(400).send(error.message)
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

  
  export const toggleColorStatus= async(req,res)=>{
    try {
      const colorFound=await Color.findById(req.params.id);
      if (!colorFound) return res.status(404).json({message: 'Color not found'})  
      colorFound.status = !colorFound.status;
      await colorFound.save();
      res.json({message:"status updated"})
    } catch (error) {
      res.status(400).send(error.message)
    }
  }

  export const deleteColor = async (req, res)=>{
    try {
      const color = await Color.findByIdAndDelete(req.params.id);
      if (!color)return res.status(404).json({ message: 'Color not found' });
      res.sendStatus(204);
      
    } catch (error) {
      res.status(400).send(error.message)
    }
  }