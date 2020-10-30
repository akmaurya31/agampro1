const Customer = require("../models/customer.model.js");
const substrings = require("../../node_modules/substrings");
// const substr = require("../../node_modules/substr");
//  const parser = require('../../node_modules/xml2json');
//onst https = require('../../node_modules/https');
var mysql = require('../../node_modules/mysql');

var jsonxml  = require('../../node_modules/jsontoxml');
var convert = require('../../node_modules/xml-js');

const axios = require('../../node_modules/axios');

var fs = require('fs');

// var substring = require("../../node_modules/substring");
//var curl = require("../../node_modules/models/curl");
// Create and Save a new Customer
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Customer
  const customer = new Customer({
    email: req.body.email,
    name: req.body.name,
    active: req.body.active
  });

  console.log(req)

  // Save Customer in the database
  Customer.create(customer, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Customer."
      });
    else res.send(data);
  });
};

////////////////////////////////////////


exports.sendData = (req, res) => {
  
//console.log('hi agam')
//console.log(req.body.ASSET_CLASS);

//const postarray= { ASSET_CLASS:req.body.ASSET_CLASS,str_key:req.body.str_key }
const postarray= { postman_array:req.body }


Customer.getAllp(postarray,(err, data) => {
  if (err)
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving customers."
    });
  else res.send(data);
});
 
};

// Retrieve all Customers from the database.
exports.findAll = (req, res) => {
  Customer.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving customers."
      });
    else res.send(data);
  });
};


// Retrieve all Customers from the database.
exports.getnsebank = (req, res) => {  
  Customer.getAllnsebank((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred w1111hile retrieving customers."
      });
    else { 
      
      const textc = { 'message' : 'Successfully', 'status' : '200', 'data':data };   
      res.send(textc);    
          
         // res.send(data); 
    
    }
  });
};


exports.getnseproducts = (req, res) => { 
    
  Customer.getAllnseproducts((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred w1111hile retrieving customers."
      });
    else { 
      
      const textc = { 'message' : 'Successfully', 'status' : '200', 'data':data };   
      res.send(textc);    
          
         // res.send(data); 
    
    }
  });
};

exports.getnseproductsbyclass = (req, res) => { 
    
  Customer.getnseproductsbyclass((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred w1111hile retrieving customers."
      });
    else { 
      
      const textc = { 'message' : 'Successfully', 'status' : '200', 'data':data };   
      res.send(textc);    
          
         // res.send(data); 
    
    }
  });
};

exports.getnseproductsbyid = (req, res) => {  
  Customer.getnseproductsbyclass(req.params.asset_class, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred w1111hile retrieving customers."
      });
    else { 
      
      const textc = { 'message' : 'Successfully', 'status' : '200', 'data':data };   
      res.send(textc);    
          
         // res.send(data); 
    
    }
  });
};



exports.getnseproduct=(req,res)=>{
  var api_url = 'https://uat.nsenmf.com/NMFIIService/NMFService/product?BrokerCode=ARN-21399&Appln_Id=MFS21399&Password=Account@2121';
  https.get(api_url, (resp) => {
  let data = '';
  // A chunk of data has been recieved.
  resp.on('data', (chunk) => {
    data += chunk;
  });
  // The whole response has been received. Print out the result.
  resp.on('end', () => {
    console.log(JSON.parse(data).explanation);
  });

   }).on("error", (err) => {
  console.log("Error: " + err.message);
   });
 
};




// Find a single Customer with a customerId
exports.findOne = (req, res) => {
  Customer.findById(req.params.customerId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Customer with id ${req.params.customerId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Customer with id " + req.params.customerId
        });
      }
    } else res.send(data);
  });
};

exports.findOne1users = (req, res) => {
  Customer.findByIdusers(req.params.emailId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Customer with id ${req.params.emailId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Customer with id " + req.params.emailId
        });
      }
    } else {   
             
     //      {"id":1,"name":"ajay","user_id":"","email":"akmaurya31@gmail.com","pin":0,"phone":"9616118873","email_verified_at":null,"password":"$2y$10$PRNuNEtQfJoCnJ.yoM9y/uYHft5YfIUGKalyF3UqBUGBcpb6JvZDy","role":2,"profile_pic":null,"address":"Lucknow","locallity":"bfc","pincode":226010,"country":101,"state":"Utter paradesh","city":"Lucknow","date_of_birrth":"1995-03-03T00:00:00.000Z","father_name":"MrLalji Mauray","mother_name":"N","gender":"2","material_status":1,"birth_palce":"lucknow","occupation":3,"income_range":1,"resident_status":"1","othertaxpayer":null,"exposedPolitically":null,"taxIdentificationNo":"12346097653","taxcountry":null,"identificationType":"commercial","signature":"public/uploads/signature/159860911077579.jpg","remember_token":"rnAc63UZGO","created_at":"2020-07-30T06:28:32.000Z","updated_at":"2020-09-17T20:48:46.000Z","otp":0,"status":1,"pan_card":"dtyrrt","social_id":"","address_proof":null,"iin":"","ID_NUMBER":""}
   
      
      var dated=data.date_of_birrth;   
      
      var dd = String(dated.getDate()).padStart(2, '0');
      var mmm = String(dated.getMonth() + 1).padStart(2, '0');
      var yyyy = dated.getFullYear();
      
      var nefodate= dd + "-" + mmm + "-" + yyyy;
      var frmt_dob1 ={ "date_of_birth" : nefodate };      
      
      const assign_dob_in_data = Object.assign(data, frmt_dob1);    
      const textc = { 'message' : 'Successfully', 'status' : '200', 'data':data };   
      res.send(textc);    
    }
  });
};

// Update a Customer identified by the customerId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  Customer.updateById(
    req.params.customerId,
    new Customer(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Customer with id ${req.params.customerId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Customer with id " + req.params.customerId
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Customer with the specified customerId in the request
exports.delete = (req, res) => {
  Customer.remove(req.params.customerId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Customer with id ${req.params.customerId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Customer with id " + req.params.customerId
        });
      }
    } else res.send({ message: `Customer was deleted successfully!` });
  });
};

// Delete all Customers from the database.
exports.deleteAll = (req, res) => {
  Customer.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all customers."
      });
    else res.send({ message: `All Customers were deleted successfully!` });
  });
};


exports.getusers = (req, res) => {
  
  Customer.getAllusers((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving customers."
      });
    else res.send(data);
  });
};

//////////////////////


exports.readFatca1= (req, res) => {

   console.log("AGAMJI ji", req.body)

const postarray= { email:req.body.email }
console.log(postarray)
  
  Customer.getFatcamm(postarray.email,(err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving customers."
      });
    else {  
      
     // res.send(data);
      let urs_full=data
      let urs=data[0]
      let urs1=data.intbl
      let urs2=data.datasrc
     console.log("agamursFULL--",urs_full);
    //  console.log("agamurs1--",urs1);
  //   console.log("ahgamurs2---",urs2[0].type);
     // console.log(urs.exposedPolitically);

   //  var months = 'Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec'.split(' ');
    //  s='2016-10-14'; 
//     var strxxx = "Hello world!";
// var resxxx = strxxx.substring(1, 4); //ell\
// resdatemy=typeof(String(urs.date_of_birrth));
// var s = resdatemy.substring(0, 10);


// console.log("MYORIGINAL-----",resxxx,resdatemy);

    
  //   resdatemy=String(urs.date_of_birrth);
  //    var ss = resdatemy.substring(4, 16);
  // var kkd=s=Date(ss,"dd-mm-yyyy");


    //console.log("MYORIGINALssssss-----",ss,kkd);

    //  var b = s.split(/\D/);
    //  console.log("FULLDATE---",b)
    //    console.log("MYFORMATE---",b[2] + '-' + months[b[1]-1]+'-'+b[0]);
    
    resdatemy=String(urs.date_of_birrth);
    
    xb=resdatemy.split(" ");
    

  let mydob_xb=xb[2]+"-"+xb[1]+"-"+xb[3]


  console.log("my resdatemy ",resdatemy,"--------",xb[1],xb[2],xb[3],"mydob_xb",mydob_xb);

//console.log("hi gam")
     let itype=urs2[0].type;
       itype=itype.toLowerCase();
     var text;

     console.log("the i type is",itype);

  switch(itype) {
    case "passport":
      text = "A";
    break;
    case "aadhaar":
    text = "G";
    break;
    case "Driving License":
    text = "E";
    break;
    default:
    text = "X";
  }

     var pep= (urs.exposedPolitically == '1') ? "N" : "Y";
//jitna ho ske dynamic karo  --as lgendre pancard emnail dob ok. sir



      let arrk={NMFIIService:{service_request:{
        appln_id:'MFS21399',
        password:'Account@2121',
        broker_code:'ARN-21399',
        pan:urs.pan_card,
        tax_status:'01',
        investor_name:urs.name,
        chkExempIndValid:'N',
        editor_id:'KGNANA',
        ubo_applicable_count:'2',
        iin:urs.iin,
        kyc:{
          app_income_code:urs1[0].id,
          net_worth_sign:'+',
          net_worth:'5000',
          net_worth_date:'31-Jul-2015',
         // pep: testBoolean ? "attributeTwo" : "attributeTwoToo",
        //  pep: if(urs.exposedPolitically == '1') ? "N" : "Y",
           pep:pep,
          occ_code:urs.occupation,
          source_wealth:'03',
          corp_servs:'01'
        },
        Fatca:{
             dob:mydob_xb,   //timezone issue
             addr_type:"1",  //<--- from table doc address
             data_src:text, //<---  from table doc DL types
            log_name:urs.email,     //email id already dynamic
             country_of_birth:'IND', //<---
              place_birth: urs.city,
            tax_residency:NaN,  //<---
           country_tax_residency1:urs.taxcountry,  //<---
            tax_payer_identityno1:'PYBQI9229X',  //<---
             id1_type:'C',  //<---
            country_tax_residency2:'',
           tax_payer_identityno2:'',
            id2_type:'',
            country_tax_residency3:'',
            tax_payer_identityno3:'',
            id3_type:'',
            country_tax_residency4:'',
            tax_payer_identityno4:'',
            id4_type:'',
            ffi_drnfe:'',
            nffe_catg:'',
            nature_bus:'',
            act_nfe_subcat:'',
            stock_exchange:'',
            listed_company:'',
            us_person:'N',
            exemp_code:'',
            giin_applicable:'',
            giin:'',
            giin_exem_cat:'',
            sponcer_availability:'',
            sponcer_entity:'',
            giin_not_app:'',
            fatca_dec_received:'Y',
        },
        ubo:{
               ubo_add1:'df',
               ubo_add2:'ddd',
               ubo_add3:'dd',
               ubo_master_codes:'C04',
               ubo_pan_no:'THTHT1234P',
               ubo_name:'BDDD',
               ubo_country_tax_residency:'IND',
               ubo_cob:'TN',
               ubo_cocn:'IND',
               ubo_country:'IND',
              ubo_dob:'14-Jan-1988',
              ubo_father_nam:'JDFD',
              ubo_gender:'M',
              ubo_holding_perc:'100',
              ubo_occ_code:'3D',
              ubo_tel_no:'5151515',
              ubo_mobile:'9876543121',
              ubo_pincode:'123123',
              ubo_city:'SDF',
              ubo_state:'SDF',
             ubo_add_type:'1',
             ubo_id_type:'C',
             ubo_tin_no:'SADFD6265D'
        }//ubo
      
      }//service_request
    
    
    } //NMFIIService
  
  }//else


let xml_agamji=jsonxml(arrk);
      console.log(xml_agamji);

     fs.appendFile('mynse2.xml', xml_agamji, function (err) {
      if (err) throw err;
      console.log('Savedxml!');
    });


    axios.post('https://uat.nsenmf.com/NMFIITrxnService/NMFTrxnService/FATCAKYCUBOREG',
    xml_agamji,
    {headers:
      {'Content-Type': 'text/xml'}
    }).then(res22=>{
      // console.log(res22);
     // console.log("AGAMREACT");

  let agammess='';

  var result1 = convert.xml2js(res22.data, {compact: true, spaces: 4});
  // console.log(result1)
  var fatcaresult=result1.DataSet['diffgr:diffgram'].NMFIISERVICES.service_status.service_return_code._text;
  var fatcaresult2=result1.DataSet['diffgr:diffgram'].NMFIISERVICES.service_response;
  // var fatcaresult3=result1.DataSet['diffgr:diffgram'].NMFIISERVICES.service_response.return_msg
  // console.log("fatsts", fatcaresult)
  // console.log("kjm", fatcaresult2)
  // console.log("hjkhjk", fatcaresult3)

  //if(fatcaresult2)

  // var fruits = ["Banana", "Orange", "Apple", "Mango"];
  
//  var chk= Array.isArray(fatcaresult2);
//  console.log(chk)
//  var  message2='';

//  if(chk === true){

// message2=result1.DataSet['diffgr:diffgram'].NMFIISERVICES.service_response[0].return_msg._text



//  }else{

//   message2=result1.DataSet['diffgr:diffgram'].NMFIISERVICES.service_response.return_msg._text
//  }

      if(fatcaresult==0){

     agammess= {
       status:200,
        message:'Success',
        // data:  result1.DataSet['diffgr:diffgram'].NMFIISERVICES.service_response.return_msg._text
      }
    }else{
      agammess= {
        status:200,
         message:fatcaresult2
          
          
       }
    }

      res.send(agammess);


     // console.log("AGAMREACT22");

    }).catch(err=>{console.log(err)});



     // let xml_agamji=jsonxml(data[0]);
     // console.log(xml_agamji);

    }
  });
};



// Retrieve all Customers from the database.
exports.bankdata = (req, res) => {
  var url="https://uat.nsenmf.com/NMFIIService/NMFService/Bank?BrokerCode=ARN-21399&Appln_Id=MFS21399&Password=Account@2121";
  //curl.get(url, options, function(err, response, body) {});

  // curl(url, function(err) {
  //   console.info(this.status);
  //   console.info('-----');
  //   console.info(this.body);
  //   console.info('-----');
  //   console.info(this.info('SIZE_DOWNLOAD'));
  // });

  var data2={mse:"Teskdsl",nseurl:url};
  // data['url']=url;
  // data['body']='body';
  // data['response']='response';

  res.send(data2);


};


 
exports.handler = function(context, event, callback) {
  fs.readFile('./mynse.xml', (err, data) => {
    if (err) throw err;
    console.log(data);
  });


 
  var config = {
   headers: {'Content-Type': 'text/xml'}
  };
   axios.post('https://uat.nsenmf.com/NMFIITrxnService/NMFTrxnService/FATCAKYCUBOREG', xmlBodyStr, config).then(res => {
  callback(res.data);
  }).catch(err => callback(err));
  };    

  exports.handxml2 = (req, res) => {

    console.log("AgamSir");
  let xmls='<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"\
                              xmlns:web="http://www.webserviceX.NET/">\
              <soapenv:Header/>\
              <soapenv:Body>\
                <web:ConversionRate>\
                  <web:FromCurrency>INR</web:FromCurrency>\
                  <web:ToCurrency>USD</web:ToCurrency>\
                </web:ConversionRate>\
              </soapenv:Body>\
            </soapenv:Envelope>';
  
  axios.post('http://www.webservicex.com/CurrencyConvertor.asmx?wsdl',
             xmls,
             {headers:
               {'Content-Type': 'text/xml'}
             }).then(res=>{
               console.log(res);
             }).catch(err=>{console.log(err)});
  
            };



            exports.handxml3= (req, res) => {

              console.log("AgamSir  je kaise ho?");

              let xmldata='<NMFIIService><service_request><appln_id>MFS21399</appln_id><password>Account@2121</password><broker_code>ARN-21399</broker_code><pan>DSEPK8009W</pan><tax_status>01</tax_status><investor_name>Shweta Rathore</investor_name><chkExempIndValid>N</chkExempIndValid><editor_id>KGNANA</editor_id><ubo_applicable_count>2</ubo_applicable_count><iin>5011221080</iin><KYC><app_income_code>34</app_income_code><net_worth_sign>+</net_worth_sign><net_worth>5000</net_worth><net_worth_date>31-Jul-2015</net_worth_date><pep>Y</pep><occ_code>1</occ_code><source_wealth>03</source_wealth><corp_servs>01</corp_servs></KYC><Fatca><dob>20-JAN-1995</dob><addr_type>2</addr_type><data_src>E</data_src><log_name>krishnaravi17@gmail.com</log_name><country_of_birth>IND</country_of_birth><place_birth>Lucknow</place_birth><tax_residency>N</tax_residency><country_tax_residency1>IND</country_tax_residency1><tax_payer_identityno1>PYBQI9229X</tax_payer_identityno1><id1_type>C</id1_type><country_tax_residency2></country_tax_residency2><tax_payer_identityno2></tax_payer_identityno2><id2_type></id2_type><country_tax_residency3></country_tax_residency3><tax_payer_identityno3></tax_payer_identityno3><id3_type></id3_type><country_tax_residency4></country_tax_residency4><tax_payer_identityno4></tax_payer_identityno4><id4_type></id4_type><ffi_drnfe></ffi_drnfe><nffe_catg></nffe_catg><nature_bus></nature_bus><act_nfe_subcat></act_nfe_subcat><stock_exchange></stock_exchange><listed_company></listed_company><us_person>N</us_person><exemp_code></exemp_code><giin_applicable></giin_applicable><giin></giin><giin_exem_cat></giin_exem_cat><sponcer_availability></sponcer_availability><sponcer_entity></sponcer_entity><giin_not_app></giin_not_app><fatca_dec_received>Y</fatca_dec_received></Fatca><ubo><ubo_add1>df</ubo_add1><ubo_add2>ddd</ubo_add2><ubo_add3>dd</ubo_add3><ubo_master_codes>C04</ubo_master_codes><ubo_pan_no>THTHT1234P</ubo_pan_no><ubo_name>BDDD</ubo_name><ubo_country_tax_residency>IND</ubo_country_tax_residency><ubo_cob>TN</ubo_cob><ubo_cocn>IND</ubo_cocn><ubo_country>IND</ubo_country><ubo_dob>14-Jan-1988</ubo_dob><ubo_father_nam>JDFD</ubo_father_nam><ubo_gender>M</ubo_gender><ubo_holding_perc>100</ubo_holding_perc><ubo_occ_code>3D</ubo_occ_code><ubo_tel_no>5151515</ubo_tel_no><ubo_mobile>9876543121</ubo_mobile><ubo_pincode>123123</ubo_pincode><ubo_city>SDF</ubo_city><ubo_state>SDF</ubo_state><ubo_add_type>1</ubo_add_type><ubo_id_type>C</ubo_id_type><ubo_tin_no>SADFD6265D</ubo_tin_no></ubo></service_request></NMFIIService>';

       /*    let xmls='<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"\
                                        xmlns:web="http://www.webserviceX.NET/">\
                        <soapenv:Header/>\
                        <soapenv:Body>\
                          <web:ConversionRate>\
                            <web:FromCurrency>INR</web:FromCurrency>\
                            <web:ToCurrency>USD</web:ToCurrency>\
                          </web:ConversionRate>\
                        </soapenv:Body>\
                      </soapenv:Envelope>';  
            
            axios.post('http://www.webservicex.com/CurrencyConvertor.asmx?wsdl',
                       xmls,
                       {headers:
                         {'Content-Type': 'text/xml'}
                       }).then(res=>{
                         console.log(res);
                       }).catch(err=>{console.log(err)});  */

                       axios.post('https://uat.nsenmf.com/NMFIITrxnService/NMFTrxnService/FATCAKYCUBOREG',
                       xmldata,
                       {headers:
                         {'Content-Type': 'text/xml'}
                       }).then(res=>{
                         console.log(res);
                       }).catch(err=>{console.log(err)});
            
                      };




  exports.handxml = (req, res) => {

    console.log("AgamSir 111");
  let xmls='<NMFIIService><service_request><appln_id>MFS21399</appln_id><password>Account@2121</password><broker_code>ARN-21399</broker_code><pan>DSEPK8219J</pan><tax_status>1</tax_status><investor_name>sohan yare</investor_name><chkExempIndValid>N</chkExempIndValid><editor_id>KGNANA</editor_id><ubo_applicable_count>2</ubo_applicable_count><iin>5011221492</iin><kyc><app_income_code>34</app_income_code><net_worth_sign>+</net_worth_sign><net_worth>5000</net_worth><net_worth_date>31-Jul-2015</net_worth_date><pep>1</pep><occ_code>1</occ_code><source_wealth>3</source_wealth><corp_servs>1</corp_servs></kyc><Fatca><dob>2020-10-25T18:30:00.000Z</dob><addr_type>2</addr_type><data_src>E</data_src><log_name>testing24@gmail.com</log_name><country_of_birth>IND</country_of_birth><place_birth>Lucknow</place_birth><tax_residency>NaN</tax_residency><country_tax_residency1/><tax_payer_identityno1>PYBQI9229X</tax_payer_identityno1><id1_type>C</id1_type><country_tax_residency2/><tax_payer_identityno2/><id2_type/><country_tax_residency3/><tax_payer_identityno3/><id3_type/><country_tax_residency4/><tax_payer_identityno4/><id4_type/><ffi_drnfe/><nffe_catg/><nature_bus/><act_nfe_subcat/><stock_exchange/><listed_company/><us_person>N</us_person><exemp_code/><giin_applicable/><giin/><giin_exem_cat/><sponcer_availability/><sponcer_entity/><giin_not_app/><fatca_dec_received>Y</fatca_dec_received></Fatca></service_request></NMFIIService>';
  
  axios.post('https://uat.nsenmf.com/NMFIITrxnService/NMFTrxnService/FATCAKYCUBOREG',
             xmls,
             {headers:
               {'Content-Type': 'text/xml'}
             }).then(res=>{
               console.log(res);


             }).catch(err=>{console.log(err)});
  
            };
