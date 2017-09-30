//<reference path="angular.min.js" />
			jQuery(function($) {

			    /* initialize the external events
                    -----------------------------------------------------------------*/

                $(document).ready(function () {
                    $.ajax({
                        url: 'http://10.254.116.132/Repository_Service/Repository_Service.asmx/Collection_Web',

                        method: 'post',
                        datatype: 'xml',
                        success: function (data) {
                            var even = data.toString();
                            var myObj = JSON.parse(even);
                            console.log(myObj);

                        }
                    });
                });

                var collectio_tick = 0;
			    $('#external-events div.external-event').each(function() {

			        // create an Event Object (http://arshaw.com/fullcalendar/docs/event_data/Event_Object/)
			        // it doesn't need to have a start or end
			        var eventObject = {
			            title: $.trim($(this).text()) // use the element's text as the event title
			        };

			        // store the Event Object in the DOM element so we can get to it later
			        $(this).data('eventObject', eventObject);

			        // make the event draggable using jQuery UI
			        $(this).draggable({
			            zIndex: 999,
			            revert: true,      // will cause the event to go back to its
			            revertDuration: 0  //  original position after the drag
                    });

			    });


			    var date = new Date();
			    var d = date.getDate();
			    var m = date.getMonth();
			    var y = date.getFullYear();
                //var events = [{ title: 'Long Event', start: '2017-09-07', end: '2017-09-10' }, { title: 'Conference', start: '2017-09-11', end: '2017-09-13' }, { title: 'Meeting', start: '2016-09-12T10:30:00', end: '2016-09-12T12:30:00' }, { title: 'Lunch', start: '2016-09-12T12:00:00' }, { title: 'Meeting', start: '2017-09-12T14:30:00' }, { title: 'Happy Hour', start: '2016-09-12T17:30:00' }, { title: 'Click for Google', url: 'http://google.com/', start: '2016-09-28' }];
                var events = [];
                var n = 10;
                var sample;

                $(document).ready(function () {
                    function getParameterByName(name, url) {
                        if (!url) url = window.location.href;
                        name = name.replace(/[\[\]]/g, "\\$&");
                        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
                            results = regex.exec(url);
                        if (!results) return null;
                        if (!results[2]) return '';
                        return decodeURIComponent(results[2].replace(/\+/g, " "));
                    }
                    $.ajax({
                        url: 'http://10.254.116.132/Repository_Service/Repository_Service.asmx/Events_Web',
                        method: 'post',
                        datatype: 'json',
                       
                        success: function (data) {

                            var id = getParameterByName('fafafafffafaddiiixxvvwweazccddd');
                         
                            var even = data.toString();
                            var myObj = JSON.parse(even);
                            console.log(myObj);
                            collectio_tick = myObj;
                            $(document).ready(function () {
                                $.ajax({
                                    url: 'http://10.254.116.132/Repository_Service/Repository_Service.asmx/Collection_Web',

                                    method: 'post',
                                    datatype: 'xml',
                                    success: function (data2) {
                                        var even2 = data2.toString();
                                        var myObj2 = JSON.parse(even2);
                                        console.log(myObj2);
                                        var htmltext = "";
                                        htmltext += "<table style='width:100%;' cellpadding='100px'><tr class='external-event label-success' ><td style='padding-left:10px;padding-right:50px'></td><td></td><td style='text-align:left;width:70%'><label> <span class='lbl'><h4><b>Customer Address</b></h4></span></label></td><td style='text-align:left;width:100%'><label> <span class='lbl'><h4><b>Booking Date</b></h4></span></label></td></tr>";
                                        for (var i = 0; i < myObj.length; i++) {
                                            if (myObj2[i].Colletion_ID != id)
                                            {
                                              htmltext += "<tr text-align='center' class='external-event label-yellow'><td style='padding-left:10px;padding-right:30px'><label  > <input type='checkbox' class='ace ace-checkbox' id='col" + i + "' /><span class='lbl'></span></label ></td><td style='text-align:left;width:70%'><label  > <span class='lbl'>" + myObj2[i].Customer_Address + "</span></label ></td><td style='text-align:left;width:100%'><label  ><span class='lbl'>" + myObj2[i].Booking_Date + "</span></label ></td></tr>";
                                            }
                                          
                                        }
                                        htmltext += "</table>";
                                        document.getElementById("Collections").innerHTML = htmltext;
                                    }
                                });
                            });

                            var calendar = $('#calendar').fullCalendar({
                                //isRTL: true,
                                //firstDay: 1,// >> change first day of week 

                                buttonHtml: {
                                    prev: '<i class="ace-icon fa fa-chevron-left"></i>',
                                    next: '<i class="ace-icon fa fa-chevron-right"></i>'
                                },

                                header: {
                                    left: 'prev,next today',
                                    center: 'title',
                                    right: 'month,agendaWeek,agendaDay'
                                },

                                events: myObj


                                ,
                                editable: true,
                                droppable: true, // this allows things to be dropped onto the calendar !!!
                                drop: function (date) { // this function is called when something is dropped

                                    // retrieve the dropped element's stored Event Object
                                    var originalEventObject = $(this).data('eventObject');
                                    var $extraEventClass = $(this).attr('data-class');


                                    // we need to copy it, so that multiple events don't have a reference to the same object
                                    var copiedEventObject = $.extend({}, originalEventObject);

                                    // assign it the date that was reported
                                    copiedEventObject.start = date;
                                    copiedEventObject.allDay = false;
                                    if ($extraEventClass) copiedEventObject['className'] = [$extraEventClass];

                                    // render the event on the calendar
                                    // the last `true` argument determines if the event "sticks" (http://arshaw.com/fullcalendar/docs/event_rendering/renderEvent/)
                                    $('#calendar').fullCalendar('renderEvent', copiedEventObject, true);

                                    // is the "remove after drop" checkbox checked?
                                    if ($('#drop-remove').is(':checked')) {
                                        // if so, remove the element from the "Draggable Events" list
                                        $(this).remove();
                                    }

                                }
                                ,
                                selectable: true,
                                selectHelper: true,
                                select: function (start, end, allDay) {


                                    bootbox.prompt("New Event Title:", function (title) {
                                        if (title !== null) {
                                            calendar.fullCalendar('renderEvent',
                                                {
                                                    title: title,
                                                    start: start,
                                                    end: end,
                                                    allDay: allDay,
                                                    className: 'label-info'
                                                },
                                                true // make the event "stick"

                                            );


                                        }

                                        document.getElementById('RadTextBox1').value = moment(start).format();
                                        document.getElementById('RadTextBox2').value = moment(end).format();
                                       // var textBox = document.getElementById('<%=txtText.ClientID %>');

                                        $("#Button1").click(function () {
                                            
                                            var startDate = document.getElementById('RadTextBox1').value;
                                            var endDate = document.getElementById('RadTextBox2').value;
                                            var id = getParameterByName('fafafafffafaddiiixxvvwweazccddd');


                                 

                                               $(document).ready(function () {
                                                    $.ajax({
                                                        url: 'http://10.254.116.132/Repository_Service/Repository_Service.asmx/Update_Event_Web',
                                                        data: { id: id, title: title, startDate: startDate, endDate: endDate },
                                                        method: 'post',
                                                        datatype: 'xml',
                                                        success: function (data) {
                                                            var jqueryXml = jQuery(data).text();;

                                       
                                                            $(document).ready(function () {
                                                                $.ajax({
                                                                    url: 'http://10.254.116.132/Repository_Service/Repository_Service.asmx/Collection_Web',

                                                                    method: 'post',
                                                                    datatype: 'xml',
                                                                    success: function (data2) {
                                                                        var even2 = data2.toString();
                                                                        var myObj2 = JSON.parse(even2);
                                                                        console.log(myObj2);
                                                    
                                                                        var collec = 0;
                                                                        for (var i = 0; i < myObj2.length; i++) {
                                                                      
                                                                            if (document.getElementById("col" + i).checked == true) {
                                                                           
                                                                                collec = myObj2[i].Colletion_ID;
                                                                                $(document).ready(function () {
                                                                                    $.ajax({
                                                                                        url: 'http://10.254.116.132/Repository_Service/Repository_Service.asmx/Assign',
                                                                                        data: { Collection_ID: id, Predecessor: collec, title: title, startDate: startDate, endDate: endDate},
                                                                                        method: 'post',
                                                                                        datatype: 'xml',
                                                                                        success: function (data) {
                                                                                            var jqueryXml = jQuery(data).text();;

                                                                                        }
                                                                                    });
                                                                                });
                                                                            }

                                                                        }
                                              
                                                                        

                                                                    }
                                                                });
                                                            });

                                                        }
                                                    });
                                                });
                                            
                                            


                                        });
                                  

                                    });


                                    calendar.fullCalendar('unselect');
                                }
                                ,
                                eventClick: function (calEvent, jsEvent, view) {

                                    //display a modal
                                    var modal =
                                        '<div class="modal fade">\
			                              <div class="modal-dialog">\
			                               <div class="modal-content">\
				                             <div class="modal-body">\
				                               <button type="button" class="close" data-dismiss="modal" style="margin-top:-10px;">&times;</button>\
				                               <form class="no-margin">\
					                              <label>Change event name &nbsp;</label>\
					                              <input class="middle" autocomplete="off" type="text" value="' + calEvent.title + '" />\
					                             <button type="submit" class="btn btn-sm btn-success"><i class="ace-icon fa fa-check"></i> Save</button>\
				                               </form>\
				                             </div>\
				                             <div class="modal-footer">\
					                            <button type="button" class="btn btn-sm btn-danger" data-action="delete"><i class="ace-icon fa fa-trash-o"></i> Delete Event</button>\
					                            <button type="button" class="btn btn-sm" data-dismiss="modal"><i class="ace-icon fa fa-times"></i> Cancel</button>\
				                             </div>\
			                              </div>\
			                             </div>\
			                            </div>';



                                    var modal = $(modal).appendTo('body');
                                    modal.find('form').on('submit', function (ev) {
                                        ev.preventDefault();

                                        calEvent.title = $(this).find("input[type=text]").val();
                                        calendar.fullCalendar('updateEvent', calEvent);
                                        modal.modal("hide");
                                    });
                                    modal.find('button[data-action=delete]').on('click', function () {
                                        calendar.fullCalendar('removeEvents', function (ev) {
                                            return (ev._id == calEvent._id);
                                        })
                                        modal.modal("hide");
                                    });

                                    modal.modal('show').on('hidden', function () {
                                        modal.remove();
                                    });

                                }

                            });
                        }


                    });

                });


                

			})
