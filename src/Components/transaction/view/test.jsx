function GetData(){
     var dataTable = $('#data_list').DataTable(
        { "processing": true,
             "serverSide": true,
              "order": [[0, "desc"]]
        , scrollX: true,
         scrollCollapse: true,
          fixedColumns: { leftColumns: 1, rightColumns: 2 },
           "ajax": { url: 'ajax/search_docket.php', 
            type: "post", 
            data: { top_search: $("#top_search").val(), 
                first_name: $("#first_name").val(),
                 last_name: $("#last_name").val(),
                  phone: $("#phone").val(), 
                  email: $("#email").val(), 
                  origin: $("#origin").val(),
                   destination: $("#destination").val(),
                    docket_id: $("#docket_id").val(), pnr: $("#pnr").val(),
                     tkt_status: $("#tkt_status :selected").val(), added_by: $("#added_by :selected").val(),
                      created_from: $("#created_from").val(), created_upto: $("#created_upto").val()
                     }, 

                     error: function () { $(".data_list-error").html(""); 

                        $("#data_list").append('<tbody class="data_list-error"><tr><th colspan="13">No data found in the server</th></tr></tbody>');
                         $("#data_list_processing").css("display", "none"); } } }); }