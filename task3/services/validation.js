export const validation = (schema) => async (req, res, next) => {

    try {
        await schema.validate({
            body: req.body,
            params: req.params
        });
        return next()
    } catch (error) {
        return res.status(400).json({ error });
    }
}