var express = require("express");
var router = express.Router();
var exe = require("./connection");
router.use(express.static("public/"));
function login(req) {
    if (req.session.user_id == undefined)
        return false;
    else
        return true;
}


function getDate() {
    var today = new Date();
    var date = (today.getDate() < 10) ? "0" + today.getDate() : today.getDate();
    var month = (today.getMonth() + 1 < 10) ? "0" + (today.getMonth() + 1) : today.getMonth() + 1;
    var year = today.getFullYear();
    return (year + "-" + month + "-" + date);
}

router.get("/", async function (req, res) {
    var data = await exe('select * from rector');
    var obj = { "rector": data[0] };
    res.render("user/home.ejs", obj);
});
router.get("/ug", async function (req, res) {

    res.render("user/ug.ejs");
});
router.post("/ugappli", async function (req, res) {
    if (login(req)) {
        var cd = await exe(`select user_id from ugapplication where user_id='${req.session.user_id}'`);

        const today = new Date();
        var time = today.getTime();
        var filename = time + req.files.student_img.name;
        req.files.student_img.mv("public/uploads/" + filename);
        var user_id = req.session.user_id;
        console.log(req.session.user_id);

        // await exe(`create table ugapplication(ugappli_id int primary key auto_increment ,student_name char(50),student_degree varchar(20),
        // student_mno text,student_img text,student_addr text,student_bod date,student_ano text )`);
        await exe(`insert into ugapplication(user_id,student_name,student_digree,student_mno,student_img,student_addr,student_bd,student_adhr)values
  ('${user_id}','${req.body.student_name}','${req.body.student_digree}','${req.body.student_mno}','${filename}','${req.body.student_addr}','${req.body.student_bd}','${req.body.student_adhr}')`);

        res.send(`
        <script>
           alert('Application Submited Successfully');
           location.href="/ug";
        </script>
      `);

    }
    else {
        res.send(`
        <script>
           alert('login First');
           location.href="/login";
        </script>
      `);
    }

});

router.get("/pg", async function (req, res) {
    res.render("user/pg.ejs");
});
router.post("/pgappli", async function (req, res) {
    if (login(req)) {
        var cd = await exe(`select user_id from pgapplication where user_id='${req.session.user_id}'`);

        const today = new Date();
        var time = today.getTime();
        var filename = time + req.files.student_img.name;
        req.files.student_img.mv("public/uploads/" + filename);
        console.log(req.files);


        // await exe(`create table pgapplication(pgappli_id int primary key auto_increment ,student_name char(50),student_digree varchar(20),
        //  student_mno bigint,student_img text,student_addr text,student_bd date,student_adhr text )`);
        await exe(`insert into pgapplication(user_id,student_name,student_digree,student_mno,student_img,student_addr,student_bd,student_adhr)values
  ('${req.session.user_id}','${req.body.student_name}','${req.body.student_digree}','${req.body.student_mno}','${filename}','${req.body.student_addr}','${req.body.student_bd}','${req.body.student_adhr}')`);
        console.log(req.body)
        res.send(`
        <script>
           alert('Application Submited Successfully');
           location.href="/pg";
        </script>
      `);

    }
    else {
        res.send(`
    <script>
       alert('login First');
       location.href="/login";
    </script>
  `);
    }

});
router.get("/notice", async function (req, res) {
    if (login(req)) {
        var data = await exe(`select * from notice`);
        var obj = { "notices": data }
        res.render("user/notice.ejs", obj);
    }
    else {
        res.send(`
<script>
   alert('login First');
   location.href="/login";
</script>
`);
    }
});
router.get("/emp", async function (req, res) {
    res.render("user/emp.ejs");
});
router.post("/empappli", async function (req, res) {          //////////////////////////
    if (login(req)) {
        const today = new Date();
        var time = today.getTime();
        var filename = time + req.files.emp_img.name;
        req.files.emp_img.mv("public/uploads/" + filename);
        console.log(req.files);

        // await exe(`create table empapplication(empappli_id int primary key auto_increment ,emp_name char(50),emp_cat text,
        //   emp_mno bigint,emp_img text,emp_addr text,emp_bd date,emp_adhr text )`);
        await exe(`insert into empapplication(user_id,emp_name,emp_cat,emp_mno,emp_img,emp_addr,emp_bd,emp_adhr)values
    ('${req.session.user_id}','${req.body.emp_name}','${req.body.emp_cat}','${req.body.emp_mno}','${filename}','${req.body.emp_addr}','${req.body.emp_bd}','${req.body.emp_adhr}')`);
        console.log(req.body)
        res.send(`
    <script>
       alert('Application Submited Successfully');
       location.href="/emp";
    </script>
  `);


    }
    else {
        res.send(`
<script>
   alert('login First');
   location.href="/login";
</script>
`);
    }
});


router.get("/contact", async function (req, res) {

    res.render("user/contact.ejs");
});
router.post("/massage", async function (req, res) {
    if (login(req)) {

        // await exe(`create table rectormassage(m_id int primary key auto_increment ,m_name char(50),m_catagory text,
        //   massage text )`);
        await exe(`insert into  rectormassage(m_name,m_catagory,massage)values
   ('${req.body.m_name}','${req.body.m_catagory}','${req.body.massage}')`);
        console.log(req.body)
        res.send(`
    <script>
       alert('Application Submited Successfully');
       location.href="/contact";
    </script>
  `);

    }
    else {
        res.send(`
<script>
   alert('login First');
   location.href="/login";
</script>
`);
    }
});


router.get("/profile", async function (req, res) {
    if (login(req)) {
        var data = await exe(`select * from user where user_id='${req.session.user_id}'`);
        var obj = { "user": data[0] };
        res.render("user/profile.ejs", obj);
    }
    else {
        res.send(`
<script>
   alert('login First');
   location.href="/login";
</script>
`);
    }
});
router.get("/room", async function (req, res) {
    if (login(req)) {

        var data1 = await exe(`select * from ughostel where user_id='${req.session.user_id}'`);
        var data2 = await exe(`select * from pghostel where user_id='${req.session.user_id}'`);
        if (data2[0] != undefined) {
            var obj = { "room": data2[0] };
        }
        else {
            var obj = { "room": data1[0] };
        }


        res.render("user/room.ejs", obj);
    }
    else {
        res.send(`
<script>
   alert('login first');
   location.href="/login";
</script>
`);
    }
});
router.get("/fees", async function (req, res) {
    if (login(req)) {
        var user_id = req.session.user_id;
        var data = await exe(`select ugapprove_id from ugapprove where user_id='${user_id}'`);
        var ugapprove_id = data[0].ugapprove_id;
        if (req.session.user_id != undefined && ugapprove_id != undefined) {
            console.log(ugapprove_id);
            var data1 = await exe(`select * from ugapprove where user_id='${user_id}'`);
            var user = await exe(`select * from user where user_id='${user_id}'`);
            var obj = { "approve": data1[0], "user": user[0] };

            res.render("user/fees.ejs", obj);
        }
        else {
            res.send(`
        <script>
           alert('Approveal Fail');
           location.href="/login";
        </script>
      `);
        }
    }
    else {
        res.send(`
<script>
   alert('login First');
   location.href="/login";
</script>
`);
    }

});
router.get("/pgfees", async function (req, res) {
    if (login(req)) {
        var user_id = req.session.user_id;
        var data = await exe(`select pgapprove_id from pgapprove where user_id='${user_id}'`);
        var pgapprove_id = data[0].pgapprove_id;
        if (req.session.user_id != undefined && pgapprove_id != undefined) {
            console.log(pgapprove_id);
            var data1 = await exe(`select * from pgapprove where user_id='${user_id}'`);
            var user = await exe(`select * from user where user_id='${user_id}'`);
            var obj = { "approve": data1[0], "user": user[0] };

            res.render("user/pgfees.ejs", obj);
        }
        else {
            res.send(`
        <script>
           alert('Approveal Fail');
           location.href="/login";
        </script>
      `);
        }
    }
    else {
        res.send(`
<script>
alert('login First');
location.href="/login";
</script>
`);
    }

});
router.get("/ug", async function (req, res) {
    res.render("user/ug.ejs");
});
router.get("/login", async function (req, res) {
    var obj = { "login": login(req) };
    res.render("user/login.ejs", obj);

});
router.get("/logout", async function (req, res) {
    req.session.user_id = undefined;
    res.redirect("/")
});
router.get("/register", async function (req, res) {
    var obj = { "login": login(req) };
    res.render("user/registration.ejs", obj);
});
router.post("/do_login", async function (req, res) {
    var data = await exe(`select * from user where user_mobile='${req.body.user_mobile}' and user_password='${req.body.user_password}'`);
    if (data.length > 0) {
        req.session.user_id = data[0].user_id;
        //res.send("Login Process Start");
        res.redirect("/");
    }
    else
        res.send(`
        <script>
           alert('Login Fail');
           location.href="/login";
        </script>
      `);
});
router.post("/save_user", async function (req, res) {
    // await exe(`create table user(user_id int primary key auto_increment ,user_name char(50),user_mobile bigint,user_email text,
    // user_password text )`);
    await exe(`insert into  user(user_name,user_mobile,user_email,user_password)values
     ('${req.body.user_name}','${req.body.user_mobile}','${req.body.user_email}','${req.body.user_password}')`);
    console.log(req.body)
    res.send(`
    <script>
       alert('Registration Submited Successfully');
       location.href="/login";
    </script>
  `);

});
router.get("/checkapprove", async function (req, res) {
    if (login(req)) {
        var user_id = req.session.user_id;
        var data = await exe(`select ugapprove_id from ugapprove where user_id='${user_id}'`);

        if (req.session.user_id != undefined && data[0] != undefined) {
            console.log(user_id);
            var data = await exe(`select * from ugapprove where user_id='${user_id}'`);
            var user = await exe(`select * from user where user_id='${user_id}'`);
            var obj = { "approve": data[0], "user": user[0] };

            res.render("user/fees.ejs", obj);
        }
        else {
            res.send(`
        <script>
           alert('Approveal Fail');
           location.href="/ug";
        </script>
      `);
        }
    }
    else {
        res.send(`
<script>
alert('login First');
location.href="/login";
</script>
`);
    }
});
router.get("/pgcheckapprove", async function (req, res) {
    if (login(req)) {
        var user_id = req.session.user_id;
        var data = await exe(`select pgapprove_id from pgapprove where user_id='${user_id}'`);

        if (req.session.user_id != undefined && data[0] != undefined) {
            console.log(user_id);
            var data = await exe(`select * from pgapprove where user_id='${user_id}'`);
            var user = await exe(`select * from user where user_id='${user_id}'`);
            var obj = { "approve": data[0], "user": user[0] };

            res.render("user/pgfees.ejs", obj);
        }
        else {
            res.send(`
        <script>
           alert('Approveal Fail');
           location.href="/pg";
        </script>
      `);
        }
    }
    else {
        res.send(`
<script>
alert('login First');
location.href="/login";
</script>
`);
    }
});
router.post("/payment/:approve_id", async function (req, res) {

    if (req.session.user_id != undefined) {
        var ugapprove_id = req.params.approve_id;

        var amt = 12000;
        var user_id = req.session.user_id;
        var today = getDate();
        var sql = await exe(`insert into ugfees(user_id,ugapprove_id,amount,fees_pay_date,transaction_id) values
         ('${user_id}','${ugapprove_id}','${amt}','${today}','${req.body.razorpay_payment_id}')`);
        // await exe(`create table ugfees(user_id int,ugapprove_id int ,amount int,fees_pay_date,transaction_id varchar(100))`);
        // res.send("User Id="+approve_id+" <br> Course Id="+user_id);
        res.send(`
    <script>
       alert('Fees Pay Successfully');
       location.href="/fees";
    </script>
  `);
    }
    else {
        res.send(`
        <script>
           alert('Login First');
           location.href="/login";
        </script>
      `);
    }
});
router.post("/pgpayment/:approve_id", async function (req, res) {
    if (req.session.user_id != undefined) {
        var pgapprove_id = req.params.approve_id;

        var amt = 12000;
        var user_id = req.session.user_id;
        var today = getDate();
        var sql = await exe(`insert into pgfees(user_id,pgapprove_id,amount,fees_pay_date,transaction_id) values
         ('${user_id}','${pgapprove_id}','${amt}','${today}','${req.body.razorpay_payment_id}')`);
        //await exe(`create table pgfees(user_id int,pgapprove_id int ,amount int,fees_pay_date date,transaction_id text)`);
        res.send(`
        <script>
           alert('Fees pay Successfully');
           location.href="/pgfees";
        </script>
      `);
        res.redirect("/pgfees");
    }
    else {
        res.send(`
        <script>
           alert('Login First');
           location.href="/login";
        </script>
      `);
    }
});
module.exports = router;