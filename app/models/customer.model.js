const sql = require("./db.js");
// const sql = require("./db.js");

// constructor
const Customer = function(customer) {
  this.email = customer.email;
  this.name = customer.name;
  this.active = customer.active;
};

Customer.create = (newCustomer, result) => {
  sql.query("INSERT INTO customers SET ?", newCustomer, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created customer: ", { id: res.insertId, ...newCustomer });
    result(null, { id: res.insertId, ...newCustomer });
  });
};

Customer.findById = (customerId, result) => {
  sql.query(`SELECT * FROM customers WHERE id = ${customerId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found customer: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Customer with the id
    result({ kind: "not_found" }, null);
  });
};
  
Customer.findByIdusers = (customerId, result) => {
  console.log("sdfsdfsdf1111111");
  var hdh="SELECT * FROM users WHERE email ='"+`${customerId}`+"'";
  console.log(hdh);
  sql.query(hdh, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found users: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Customer with the id
    result({ kind: "not_found" }, null);
  });
};

Customer.getAll = result => {
  sql.query("SELECT * FROM customers", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("customers: ", res);
    result(null, res);
  });
};

//Customer.getAllp = result => {
  Customer.getAllp = (postarray, result) => {
  console.log(postarray);


  let my_str_key=postarray.postman_array.str_key
  console.log(my_str_key)

  let strlike='%'+my_str_key+'%'
  console.log(strlike)

  sql.query("SELECT * FROM products where ASSET_CLASS ='"+`${postarray.postman_array.ASSET_CLASS}`+"' and PRODUCT_LONG_NAME like '"+strlike+"'", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }


 //   console.log("customers: ", )
    // var a = res[90].PRODUCT_LONG_NAME
   // console.log(a)

   // var a = 'how are you';


    // res.forEach(function (item) {
//console.log('agam')
//console.log(item.PRODUCT_LONG_NAME)

// if (item.indexOf('Dividend') > -1) {
//   console.log(item.PRODUCT_LONG_NAME)
// } else {
//   console.log("false") ;
// }


    //  });
    
    
//console.log(data.split(" ").splice(-1));

    //console.log("customers: ", res);
    result(null, res);
  });
};




Customer.getAllnsebank = result => {
  sql.query("SELECT * FROM banks", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("NSEBanksList: ", res);
    result(null, res);
  });
};


Customer.getAllnseproducts = result => {
  sql.query("SELECT * FROM products", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("NSEProductsList: ", res);
    result(null, res);
  });
};


Customer.getAllnseproductsbyclass = (classname, result) => {
  sql.query("SELECT * FROM products where asset_class='"+`${classname}`+"'");
  console.log(hdh);
  sql.query(hdh, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("NSEProductsList: ", res[0]);
      result(null, res[0]);
      return;
    }

    console.log("NSEProductsList: ", res);
    result(null, res);
  });
};

Customer.getAllusers = result => {
  sql.query("SELECT * FROM users", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("users: ", res);
    result(null, res);
  });
};


Customer.updateById = (id, customer, result) => {
  sql.query(
    "UPDATE customers SET email = ?, name = ?, active = ? WHERE id = ?",
    [customer.email, customer.name, customer.active, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Customer with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated customer: ", { id: id, ...customer });
      result(null, { id: id, ...customer });
    }
  );
};

Customer.remove = (id, result) => {
  sql.query("DELETE FROM customers WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Customer with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted customer with id: ", id);
    result(null, res);
  });
};

Customer.removeAll = result => {
  sql.query("DELETE FROM customers", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} customers`);
    result(null, res);
  });
};

///////////////////////////////////////////////////



Customer.getFatcamm = (email, result) => {

  sql.query("SELECT * FROM users where email='"+`${email}`+"'", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
      
   let u_id=res[0].id; 

    sql.query("SELECT * FROM 	vk_onbording_kyc where 	user_id='"+`${u_id}`+"'", (err, res212) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
     
      res.datasrc=res212;
     // result(null, res);       
    });
   

     let 	my_income_range_id=res[0].income_range;
 if(my_income_range_id>=1){ 
  sql.query("SELECT * FROM 	income_range where 	income_range_id='"+`${my_income_range_id}`+"'", (err, res222) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }   
    res.intbl=res222;
    result(null, res);    
  });
}
 
});
};
module.exports = Customer;