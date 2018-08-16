// app/routes.js
module.exports = function (app, passport) {

    app.get('/', isLoggedIn, function (req, res) {
        res.render('../index.ejs', {
            user: req.user // truyền đối tượng user cho index.ejs để hiển thị lên view
        });
    });

    app.get('/table-post', isLoggedIn, function (req, res) {
        res.render('../table-posts.ejs', {
            user: req.user // truyền đối tượng user cho table-posts.ejs để hiển thị lên view
        });
    });

    app.get('/table-user', isLoggedIn, function (req, res) {
        res.render('../table-users.ejs', {
            user: req.user // truyền đối tượng user cho profile.ejs để hiển thị lên view
        });
    });

    app.get('/post-detail', isLoggedIn, function (req, res) {
        res.render('../post-detail.ejs', {
            user: req.user // truyền đối tượng user cho profile.ejs để hiển thị lên view
        });
    });

    app.get('/profile', isLoggedIn, function (req, res) {
        res.render('../profile.ejs', {
            user: req.user // truyền đối tượng user cho profile.ejs để hiển thị lên view
        });
    });

    app.get('/daily-report', isLoggedIn, function (req, res) {
        res.render('../daily-report.ejs', {
            user: req.user // truyền đối tượng user cho profile.ejs để hiển thị lên view
        });
    });


    app.get('/monthly-report', isLoggedIn, function (req, res) {
        res.render('../monthly-report.ejs', {
            user: req.user // truyền đối tượng user cho profile.ejs để hiển thị lên view
        });
    });


    app.get('/annual-report', isLoggedIn, function (req, res) {
        res.render('../annual-report.ejs', {
            user: req.user // truyền đối tượng user cho profile.ejs để hiển thị lên view
        });
    });

    app.get('/post-detail', isLoggedIn, function (req, res) {
        res.render('../post-detail.ejs', {
            user: req.user // truyền đối tượng user cho profile.ejs để hiển thị lên view
        });
    });


    // =====================================
    // Đăng nập ===============================
    // =====================================
    // hiển thị form đăng nhập
    app.get('/login',function (req, res) {
        if (req.user != null){
            res.render('../index.ejs');
        }else{
            res.render('../login.ejs', { message: req.flash('loginMessage') });
        }
       
    });

    app.post('/login', passport.authenticate('local-login', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true
    }));

    // =====================================
    // Đăng ký ==============================
    // =====================================
    // hiển thị form đăng ký
    app.get('/signup', function (req, res) {
        res.render('../signup.ejs', { message: req.flash('signupMessage') });
    });

    // Xử lý form đăng ký ở đây
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/login', // Điều hướng tới trang hiển thị profile
        failureRedirect: '/signup', // Trở lại trang đăng ký nếu lỗi
        failureFlash: true
    }));

    // =====================================
    // Đăng xuất ==============================
    // =====================================
    app.get('/logout', function (req, res, next) {
        req.logout();
        res.redirect('/login');
    });
    // Xử lý error 404
    app.use(function (req, res, next) {
        res.status(404).render('../404.ejs');
    })  
};

// Hàm được sử dụng để kiểm tra đã login hay chưa
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/login');
}
