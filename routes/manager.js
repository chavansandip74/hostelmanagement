var express = require("express");
var exe = require("./connection");
var router = express.Router();

router.get("/", async function (req, res) {
    if (req.session.manager_id == undefined) {
        res.redirect("/manager/login");
    }
    else {
    var data=await exe(`select * from rector`);
    console.log(data[0])
    var obj = { "rect":data};
    res.render("manager/mhome.ejs",obj);
    }
});
router.get("/pg", async function (req, res) {
    var data=await exe(`select * from pghostel`);
    var obj = { "pghostel":data};
    res.render("manager/pg.ejs",obj);
});
router.get("/delete_pgstud/:id", async function (req, res) {
    id = req.params.id;
    await exe(`DELETE FROM pghostel where user_id='${id}'`);
    res.send(`
    <script>
       alert('Deleted Application');
       location.href="/manager/pg";
    </script>
  `);
});
router.get("/ug", async function (req, res) {
    var data = await exe(`select * from ugfees `);
    var data2=await exe(`select * from ugapplication`);
    var data3=await exe(`select * from ughostel`);
    var obj = { "ugfees": data,"stud":data2,"ughostel":data3 };
    res.render("manager/ug.ejs",obj);
});
router.get("/room_allo/:id", async function (req, res) {
    var id=req.params.id;
    var data = await exe(`select * from ugfees where user_id='${id}'`);
    var data2=await exe(`select * from ugapplication where user_id='${id}'`);
    var obj = { "ugfees": data[0],"stud":data2[0] };
    res.render("manager/roomallo.ejs",obj);
});
router.post("/save_ughostel", async function (req, res) {
    const today = new Date();

     console.log(req.body.user_id);
    //await exe('create table ughostel(user_id int unique ,room_no int,student_name text,student_digree text,student_mno bigint,fees_amount bigint,transaction_id text,fees_pay_date date,student_addr text,student_bd text,student_img text,student_adhr bigint) ');
    await exe(`insert into ughostel(user_id ,room_no,student_name,student_digree,student_mno,fees_amount,transaction_id,fees_pay_date,student_addr,student_bd,student_img,student_adhr) values 
    ('${req.body.user_id}','${req.body.room_no}','${req.body.student_name}','${req.body.student_digree}','${req.body.student_mno}','${req.body.fees_amount}','${req.body.transaction_id}','${req.body.fees_pay_date}','${req.body.student_addr}','${req.body.student_bd}','${req.body.student_img}','${req.body.student_adhr}')`);
   
    res.redirect("/manager/ug");
});
router.get("/delete_ugstud/:id", async function (req, res) {
    id = req.params.id;
    await exe(`DELETE FROM ughostel where user_id='${id}'`);
    res.send(`
    <script>
       alert('Deleted Application');
       location.href="/manager/ug";
    </script>
  `);
});
router.get("/studa", async function (req, res) {
    var data1 = await exe(`select * from ugapplication `);
    var data2 = await exe(`select * from pgapplication `);
    var obj = { "studa": data1, "studa2": data2 };
    res.render("manager/studa.ejs", obj);
});
router.get("/ugapprove_stud/:id", async function (req, res) {
    id = req.params.id;
    var data = await exe(`select user_id from ugapplication where ugappli_id='${id}'`);

    var user_id = data[0].user_id;
    //await exe('create table ugapprove(ugapprove_id int primary key auto_increment,ugappli_id int,user_id int ) ');
    await exe(`insert into ugapprove(ugappli_id,user_id) values ('${id}','${user_id}')`);
    res.send(`
    <script>
       alert('approve successfully submited');
       location.href="/manager/studa";
    </script>
  `);
});
router.get("/pgapprove_stud/:id", async function (req, res) {
    id = req.params.id;
    var data = await exe(`select user_id from pgapplication where pgappli_id='${id}'`);
    var user_id = data[0].user_id;
    //await exe('create table pgapprove(pgapprove_id int primary key auto_increment,pgappli_id int ) ');
    await exe(`insert into pgapprove(pgappli_id,user_id) values ('${id}','${user_id}')`);
    res.send(`
    <script>
       alert('approve successfully submited');
       location.href="/manager/studa";
    </script>
  `);
});
router.get("/pgroom_allo/:id", async function (req, res) {
    var id=req.params.id;
    var data = await exe(`select * from pgfees where user_id='${id}'`);
    var data2=await exe(`select * from pgapplication where user_id='${id}'`);
    var obj = { "pgfees": data[0],"stud":data2[0] };
    res.render("manager/pgroomallo.ejs",obj);
});
router.post("/save_pghostel", async function (req, res) {
    const today = new Date();

     console.log(req.body.user_id);
    //await exe('create table pghostel(user_id int unique ,room_no int,student_name text,student_digree text,student_mno bigint,fees_amount bigint,transaction_id text,fees_pay_date date,student_addr text,student_bd text,student_img text) ');
       await exe(`insert into pghostel(user_id ,room_no,student_name,student_digree,student_mno,fees_amount,transaction_id,fees_pay_date,student_addr,student_bd,student_img) values 
      ('${req.body.user_id}','${req.body.room_no}','${req.body.student_name}','${req.body.student_digree}','${req.body.student_mno}','${req.body.fees_amount}','${req.body.transaction_id}','${req.body.fees_pay_date}','${req.body.student_addr}','${req.body.student_bd}','${req.body.student_img}')`);
    res.redirect("/manager/pg");
});
router.get("/delete_ugstudappli/:id", async function (req, res) {
    id = req.params.id;
    await exe(`DELETE FROM ugapplication where ugappli_id='${id}'`);
    res.send(`
    <script>
       alert('Deleted Application');
       location.href="/manager/studa";
    </script>
  `);

});
router.get("/delete_pgstudappli/:id", async function (req, res) {
    id = req.params.id;
    await exe(`DELETE FROM pgapplication where pgappli_id='${id}'`);
    res.send(`
    <script>
       alert('Deleted Application');
       location.href="/manager/studa";
    </script>
  `);
});



router.get("/empa", async function (req, res) {
    var data = await exe(`select * from empapplication`);
    var obj = { "empappli": data };

    res.render("manager/empa.ejs", obj);
});
router.get("/delete_empappli/:id", async function (req, res) {
    id = req.params.id;
    await exe(`DELETE FROM empapplication where empappli_id='${id}'`);
    res.send(`
    <script>
       alert('Deleted Application');
       location.href="/manager/empa";
    </script>
  `);

});
router.get("/empalloc/:id", async function (req, res) {
    id = req.params.id;
    var data = await exe(`select * from empapplication where empappli_id='${id}'`);
var obj={"empallo":data[0]}
    res.render("manager/empalloc.ejs",obj);

});
router.post("/save_emp", async function (req, res) {
    const today = new Date();

     console.log(req.body.user_id);
    //await exe('create table emphostel(user_id int unique ,emp_name text,emp_post text,emp_sal bigint,emp_mno bigint,emp_addr text,emp_bd text,emp_img text,emp_adhr bigint) ');
    await exe(`insert into emphostel(user_id ,emp_name,emp_post,emp_sal,emp_mno,emp_addr,emp_bd,emp_img,emp_adhr) values 
    ('${req.body.user_id}','${req.body.emp_name}','${req.body.emp_post}','${req.body.emp_sal}','${req.body.emp_mno}','${req.body.emp_addr}','${req.body.emp_bd}','${req.body.emp_img}','${req.body.emp_adhr}')`);
   
    res.redirect("/manager/empall");
});

router.get("/massage", async function (req, res) {
    var data = await exe(`select * from rectormassage`);
    var obj = { "massage": data };
    res.render("manager/massage.ejs", obj);
});

router.get("/delete_massage/:id", async function (req, res) {
    id = req.params.id;
    await exe(`DELETE FROM rectormassage where m_id='${id}'`);
 res.send(`
    <script>
       conform('Deleted massage');
       location.href="/manager/massage";
    </script>
  `);
});
router.get("/notice", async function (req, res) {
    var data = await exe(`select * from notice`);
    var obj = { "notices": data };
    res.render("manager/notice.ejs", obj);
});
router.post("/save_notice", async function (req, res) {
    const today = new Date();
    var time = today.getTime();
    var filename = time + req.files.notice_img.name;
    req.files.notice_img.mv("public/uploads/" + filename);
    console.log(req.files);


    // await exe('create table notice(notice_id int primary key auto_increment,notice_massage text,notice_img text,writer_name text) ');
    await exe(`insert into notice(notice_massage,notice_img,writer_name) values ('${req.body.notice_massage}','${filename}','${req.body.writer_name}')`);
    res.redirect("/manager/notice");
});


router.get("/delete_notice/:id", async function (req, res) {
    id = req.params.id;
    await exe(`DELETE FROM notice where notice_id='${id}'`);
    res.send(`
    <script>
       confirm('Deleted notice');
       location.href="/manager/notice";
    </script>
  `);
    
});

router.get("/fees", async function (req, res) {
    var data = await exe(`select * from ugfees`);
    var obj = { "ugfees": data };
    res.render("manager/fees.ejs",obj);
});
router.get("/delete_ugfees/:id", async function (req, res) {
    id = req.params.id;
    await exe(`DELETE FROM ugfees where user_id='${id}'`);
    res.send(`
    <script>
       confirm('Deleted notice');
       location.href="/manager/fees";
    </script>
  `);
    
});
router.get("/pgfees", async function (req, res) {
    var data = await exe(`select * from pgfees`);
    var obj = { "pgfees": data };
    res.render("manager/pgfees.ejs",obj);
});
router.get("/delete_pgfees/:id", async function (req, res) {
    id = req.params.id;
    await exe(`DELETE FROM pgfees where user_id='${id}'`);
    res.send(`
    <script>
       confirm('Deleted notice');
       location.href="/manager/pgfees";
    </script>
  `);
    
});
router.get("/empall", async function (req, res) {
    var data=await exe(`select * from emphostel`);
    var obj = { "emp":data};
    res.render("manager/empall.ejs",obj);
});
router.get("/delete_emp/:id", async function (req, res) {
    id = req.params.id;
    await exe(`DELETE FROM emphostel where user_id='${id}'`);
    res.send(`
    <script>
       confirm('Deleted notice');
       location.href="/manager/empall";
    </script>
  `);
    
});
router.post("/save_rector", async function (req, res) {
    const today = new Date();
    var time = today.getTime();
    var filename = time + req.files.rector_img.name;
    req.files.rector_img.mv("public/uploads/" + filename);
    console.log(req.files);


     //await exe('create table rector(rector_id int primary key auto_increment,rector_name text,rector_img text,rector_info text) ');
     await exe(`insert into rector(rector_name,rector_img,rector_info) values ('${req.body.rector_name}','${filename}','${req.body.rector_info}')`);
    res.redirect("/manager");
});
router.get("/delete_rector/:id", async function (req, res) {
    id = req.params.id;
    await exe(`DELETE FROM rector where rector_id='${id}'`);
    res.send(`
    <script>
       alert('Deleted Application');
       location.href="/manager";
    </script>
  `);

});
router.get("/profile", async function (req, res) {
    var data=await exe(`select * from manager`);
    var obj={"manager":data};
    res.render("manager/profile.ejs",obj);
});
router.get("/login", async function (req, res) {
    res.render("manager/login.ejs");
});
router.get("/logout",async function(req,res){
    req.session.manager_id=undefined;
    res.redirect("/")
  });
router.post("/m_login", async function (req, res) {
    var sql = `select * from manager where m_name='${req.body.m_name}' and manager_password='${req.body.manager_password}'`;
    var data = await exe(sql);
    if (data.length > 0) {
        req.session.manager_id = data[0].manager_id;
        res.redirect("/manager");
    }
    else{
        res.send(`
        <script>
          alert('manager Login Fail ');
          location.href="/manager/login";
        </script>
        `)  ;
     }
    // res.send(data);
    // res.send(req.body);
});

module.exports = router;