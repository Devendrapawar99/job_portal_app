export const testaPostController = (req,res) =>{
    const { name } = req.body;

    res.status(200).send(`My name is ${name}`)
}