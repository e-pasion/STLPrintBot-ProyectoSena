import Code from "../models/Code.js";

export const getCodes = async (req, res)=>{

    try {
        const {page, limit, search, status} = req.query;

        const query = {};
  
        if (status === 'true' || status === 'false') {
          query.status = status === 'true';
        }
  
        if (search){
          query.$or = [
            { code: { $regex: search, $options: 'i' } }, 
          ]
        }
        const options = {
          page:parseInt(page,10) || 1,
          limit: parseInt(limit,10) || 10,
        }
        const result = await Code.paginate(query,options);

            // Formatear las fechas antes de enviar la respuesta
        const formattedCodes = result.docs.map((code) => ({
            _id: code._id,
            code: code.code,
            finalDate: code.finalDate.toISOString().split('T')[0],
            discount:code.discount,
            status: code.status,
         }));
  
        const formattedResult = {
            ...result,
            docs: formattedCodes,
        };

        res.json(formattedResult);
      } catch (error) {
        res.status(400).send(error.message)
      }
}

export const getCode = async (req, res)=>{
    try {
        const code = await Code.findById(req.params.id);
        if (!code)return res.status(404).json({ message: 'Code not found' });
        
        const formattedCode={
            _id:code._id,
            code:code.code,
            finalDate: code.finalDate.toISOString().split('T')[0],
            discount:code.discount,
            status: code.status,
        }

        res.status(200).json(formattedCode)
    } catch (error) {
        res.status(400).send(error.message);  
    }
}

export const createCode = async (req, res) => {
    try {
        const {code, discount, finalDate }= req.body;
        const newCode = new Code({
            code,
            discount,
            finalDate,
        });
        console.log(newCode);
        const savedCode = await newCode.save();
        console.log(savedCode);
        res.status(200).json({savedCode})
        
    } catch (error) {
        res.status(400).send(error.message);  
    }
}

export const toggleCodeStatus= async(req,res)=>{
    try {
      const codeFound=await Code.findById(req.params.id);
      if (!codeFound) return res.status(404).json({message: 'Code not found'})  
      codeFound.status = !codeFound.status;
      await codeFound.save();
      res.json({message:"status updated"})
    } catch (error) {
      res.status(400).send(error.message)
    }
  }

export const updateCode = async (req, res)=>{
    try {
        const code = await Code.findByIdAndUpdate(req.params.id, req.body, {
            new : true
        });
        if (!code)return res.status(404).json({ message: 'Code not found' });
        res.status(201).json(code)
        
    } catch (error) {
        res.status(400).send(error.message);
    }
}

export const deleteCode = async (req, res)=>{
    try {
        console.log(req.params.id);
        const code = await Code.findByIdAndDelete(req.params.id);
        if (!code)return res.status(404).json({ message: 'Code not found' });
        res.sendStatus(204);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

