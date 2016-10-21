'use strict';

angular.module('myContacts.contacts', ['ngRoute','firebase'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/contacts', {
    templateUrl: 'contacts/contacts.html',
    controller: 'ContactsCtrl'
  });
}])

    // Contacts Controller
.controller('ContactsCtrl', ['$scope','$firebaseArray',function($scope, $firebaseArray) {

  // Init Firebase
  // Creating the functionality to grab data from Firebase. (Ref to the URL and to the contacts collection.
  var firebaseRef = new Firebase('https://mycontacts-project.firebaseio.com/contacts/');

  //Get Contacts
  // Add contacts to the scope and a sign it to the firebaseArray and pass to it the firebase ref.
  $scope.contacts = $firebaseArray(firebaseRef);

  // Show Add Form
    // This function is going to show the form for us and clear all the fields in that form.
    $scope.showAddForm = function(){
        $scope.addFormShow = true; // variable that going to be accessible in the view.
    }

    // Show Edit Form
    $scope.showEditForm = function(contact){
        $scope.editFormShow = true; // variable that going to be accessible in the view.

        // Pass all the current values of the record.
        $scope.id = contact.$id;
        $scope.name = contact.name;
        $scope.email = contact.email;
        $scope.company = contact.company;
        $scope.work_phone = contact.phones[0].work;
        $scope.home_phone = contact.phones[0].home;
        $scope.mobile_phone = contact.phones[0].mobile;
        $scope.street_address = contact.address[0].street_address;
        $scope.city = contact.address[0].city;
        $scope.state = contact.address[0].state;
        $scope.zipcode = contact.address[0].zipcode;
    }

  // Hide Forms
  $scope.hide = function(){
    $scope.addFormShow = false; // Hide the button for minimize.
      $scope.contactShow = false; // Minimize the display on the contact info.
  }

  $scope.addFormSubmit = function(){
    // Grabbing all the contact values and set them into variables.
    // if the variable is empty we're going to assign it to null.
    // MUST HAVE A VALUE OF NULL IN ORDER TO SUBMIT IT TO FIREBASE.


    // Assign Values
    if($scope.name){
      var name = $scope.name;
    }else{
      var name = null;
    }

    if($scope.email){
      var email = $scope.email;
    }else{
      var email = null;
    }

    if($scope.company){
      var company = $scope.company;
    }else{
      var company = null;
    }

    if($scope.mobile_phone){
      var mobile_phone = $scope.mobile_phone;
    }else{
      var mobile_phone = null;
    }

    if($scope.home_phone){
      var home_phone = $scope.home_phone;
    }else{
      var home_phone = null;
    }

    if($scope.work_phone){
      var work_phone = $scope.work_phone;
    }else{
      var work_phone = null;
    }

    if($scope.street_address){
      var street_address = $scope.street_address;
    }else{
      var street_address = null;
    }

    if($scope.city){
      var city = $scope.city;
    }else{
      var city = null;
    }

    if($scope.state){
      var state = $scope.state;
    }else{
      var state = null;
    }

    if($scope.zipcode){
      var zipcode = $scope.zipcode;
    }else{
      var zipcode = null;
    }

      // Build Object (JSON Format)
      $scope.contacts.$add({
          name:name,
          email:email,
          company:company,
          phones:[
              {
                  mobile:mobile_phone,
                  home:home_phone,
                  work:work_phone
              }
          ],
          address:[
              {
                  street_address:street_address,
                  city:city,
                  state:state,
                  zipcode:zipcode

              }
          ]
      }).then(function(firebaseRef){
            // Assign a key
          var id = firebaseRef.key(); // Works as a primary key.
          console.log('Added contact with ID:' + id);

          // Call a function of clear fields.
          clearFields()

          // Hide the From after insert.
          $scope.addFormShow=false;

          // Send a message to the user.
          $scope.msg = "Contact Added";


          });
  }

    $scope.editFormSubmit = function() {
        console.log('Updating contact..');

        // Get the contact id.
        var getContactID = $scope.id;

        //Get the specific record from the id.
        var record = $scope.contacts.$getRecord(getContactID);

        // Assign the Value from the record to the scope object.
        record.name  = $scope.name;
        record.email = $scope.email;
        record.company = $scope.company;
        record.phones[0].work = $scope.work_phone;
        record.phones[0].home = $scope.home_phone;
        record.phones[0].mobile = $scope.mobile_phone;
        record.address[0].street_address = $scope.street_address;
        record.address[0].city = $scope.city;
        record.address[0].state = $scope.state;
        record.address[0].zipcode = $scope.zipcode;

        // Save contact
        $scope.contacts.$save(record).then(function(firebaseRef){
            console.log(firebaseRef.key);
        });

        // After save we need to clear all the fields.
        clearFields();

        // Hide the edit Form.
        $scope.editFormShow = false;

        // Show a message after the record has been update.
        $scope.msg = 'Contact Updated';
    }




    // Phone and addresses are array and we gonna grab the first value.
    $scope.showContact = function(contact){
        $scope.name = contact.name;
        $scope.email = contact.email;
        $scope.company = contact.company;
        $scope.work_phone = contact.phones[0].work;
        $scope.mobile_phone = contact.phones[0].mobile;
        $scope.home_phone = contact.phones[0].home;
        $scope.street_address = contact.address[0].street_address;
        $scope.city = contact.address[0].city;
        $scope.state = contact.address[0].state;
        $scope.zipcode = contact.address[0].zipcode;
        $scope.contactShow =true; // when we click on the link the contact will show on the top.
    }

    // Remove the contact.
    $scope.removeContact = function(contact){
    console.log('Removing Contact');
        $scope.contacts.$remove(contact);
        $scope.msg="Contact Removed";

    }

      // Clear $scope Fields
      function clearFields(){
          console.log('Clearing All Fields...');
          $scope.name = '';
          $scope.email = '';
          $scope.company = '';
          $scope.mobile_phone = '';
          $scope.home_phone = '';
          $scope.work_phone = '';
          $scope.street_address = '';
          $scope.city = '';
          $scope.state = '';
          $scope.zipcode = '';
      }






}]);
