var request = require('axios');

module.exports =  {
    index: function(req, res) {
            request.post('http://localhost:10003/list_id_tenants')
            .then(function(response) {
                console.log(response.data);
                console.log(response.data.length);
                let tenantRequests = [];
/*                var i;
                for ( i = 0; i < response.data.length; i++) {
                    var tenant_id = response.data[i].tenant_id;

                   //console.log("tenant_id " + tenant_id);
                    //console.log(response.data[i]);
                    //tenantRequests[i] = JSON.stringify(response.data[i]);
                    //tenantRequests[i] = response.data[i];
                    //console.log("tenantRequests " + tenantRequests);

                    request.post('http://localhost:10003/gettenant', {tenant_id: tenant_id})
                    .then(function(response_a) {
                        //console.log("response_a.data " +  tenant_id + response_a);
                        tenantRequests[i] = response_a.data;

                    })
                    .catch(function(error) {
                        console.log(error);
                        //todo tell user
                    });


                }
                //res.contentType('application/json');
                //res.send(JSON.stringify(result));
 //               if (i < response.data.length) {
 //               }
 */
 //               console.log("final " + tenantRequests.length + tenantRequests);

                res.render('dashboard', {'tenants': response.data});

            })
            .catch(function(error) {
                console.log(error);
                //todo tell user
            });
    },

    //button pressed
    req_manage_tenant: function(req, res) {
         console.log("req_manage_tenant" + req.body.id);
         var form_data = {
             tenant_id: req.body.id
         };
         res.render('manage', form_data );

    },

    manage_tenant: function(req, res) {
         console.log("get_manage_tenant" + req.body);
         res.render('manage');

    }

};
