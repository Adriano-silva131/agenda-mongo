const User = require('../models/users');

exports.registerPage = (req, res) => {
    res.render('register', {
        successMessage: req.flash('success'),
        errorMessage: req.flash('error')
    })
}

exports.loginPage = (req, res) => {
    res.render('login', {
        successMessage: req.flash('success'),
        errorMessage: req.flash('error')
    })
}

exports.register = async (req, res) => {
    try {
        const { nome, email, senha } = req.body;
        let user = await User.findOne( { email });
        if (user) {
            req.flash('error', 'Usuário já cadastrado no sistema')
            return res.redirect('/register');
        }
        user = new User ({ nome, email, senha });
        await user.save();
        req.flash('success', 'Usuário cadastrado com sucesso!')
        res.redirect('/register');
    } catch (error) {
        req.flash('error', 'Erro no servidor.');
        res.redirect('/register');   
    }
};

exports.login = async (req, res) => {
    try {
        const { email, senha } = req.body;
        const user = await User.findOne( { email });
        if (!user) {
        req.flash('error', 'Usuário não registrado');
        return res.redirect('/login'); 
        }
        const isMatch = await user.comparePassword(senha);
        if (!isMatch) {
            req.flash('error', 'Senha incorreta');
            return res.redirect('/login'); 
        }
        req.session.userId = user._id;
        req.session.userName = user.nome;
        return res.redirect('/contato');
    } catch (error) {
        req.flash('error', 'Não foi possivel logar no servidor');
        res.redirect('/login'); 
    }
};

exports.logout = (req, res) => {
    req.session.destroy (err => {
        if(err) {
            console.log(err)
        }else {
            console.log('Sessão destruída com sucesso.');
        }
        res.redirect('/login')
    })
}