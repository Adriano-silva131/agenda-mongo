exports.contatoIndex = (req, res) => {
    res.render('contato', { userName: req.session.userName });
};