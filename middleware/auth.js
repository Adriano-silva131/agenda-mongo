exports.isAuthenticated = (req, res, next) => {
    if (req.session && req.session.userId) {
        next();
    } else {
        req.flash('error', 'Você precisa estar logado para acessar esta página');
        res.redirect('/login')
    }
}
