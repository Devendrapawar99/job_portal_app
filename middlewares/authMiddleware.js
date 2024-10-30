import JWT from "jsonwebtoken";


const userAuth = async (req, res, next) => { //middleware hai to req,res,next
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer")) {
        return res.status(401).send({
            success: false,
            message: "Auth Failed",
        });
    }

    const token = authHeader.split(" ")[1];

    try {
        const payload = JWT.verify(token, process.env.JWT_SECRET);
        req.user = { userId: payload.userId };
        next();  // go to the next code
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Auth Failed",
            error
        });
    }
};

export default userAuth;