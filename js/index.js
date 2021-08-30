// capitalize first letter of each word function
function capitalize_Words(str)
{
 return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

// form toggle 
var formToggle={
    toggleForm: function(){
        
        //console.log(btnState);
        $('#formBtn').click(function(){
            $('#form').slideToggle();
            var btnState=$('#formBtn').text();
            if(btnState=="Open Form >>"){
                $('#formBtn').text('Close Form');
                $('#formBtn').css('background-color','red');
            }
            else{
                $('#formBtn').text('Open Form >>');
                $('#formBtn').css('background-color','teal');
            } 
        });
    },
    init:function(){
        this.toggleForm();
    },
};

//file upload and replace the label with file name 
var fileUpload={
    replaceLabel:function(){
        $('#fileField').change(function(){
            const file = this.files[0]; 
            if(file){
                var fileName=$('#fileField').val().replace(/C:\\fakepath\\/i, '');
                $('#fileLabel').text(fileName);
            }
            else{
                $('#fileLabel').text('Upload File');
            }
        });
    },
    init: function(){
        this.replaceLabel();
    },
};

// sigle file upload and preview file
var filePreview={
    getFileAndPreview:function(){
        $('#imageUpload').change(function(){
            var file=this.files[0];
            if(file){
                var file_name=file.name;
                let reader = new FileReader();
                reader.onload=function(event){
                    $('#imagePreviewedDiv').show();
                    $('#previewedImage').attr('src', event.target.result);
                    //console.log(event.target.result);
                    $('#imageUploadLabel').text(file_name);
               }
               reader.readAsDataURL(file); 
            }
            else{
                $('#previewedImage').attr('src','#');
                $('#imageUploadLabel').text('Upload a File');
                $('#imagePreviewedDiv').hide();
            }
        });
    },

    removingFile:function(){
        $('#fileRemoveButton').click(function(){
            $('#previewedImage').attr('src', '#');
            $('#imageUploadLabel').text('Upload a File');
            $('#imagePreviewedDiv').hide();
        });
    },

    init: function(){
        this.getFileAndPreview();
        this.removingFile();
    },

};

//Addig Custom Labels and Fields
var addCustomFields={
    toggleForm:function(){
        $('#addButton').click(function(event){
            event.preventDefault();
            $('#customForm').delay(200).fadeToggle();
        });
    },

    addLabelAndFields:function(){
        var rowCount=0;
        var noOfFieldAdded=0;
        var file_count=0;
        $('#customSubmitButton').click(function(event){
            event.preventDefault();
            //var userLabel=$('#userLabel').val().charAt(0).toUpperCase()+$('#userLabel').val().slice(1);
            var userLabel=capitalize_Words($('#userLabel').val());
            var userField=$('#userField').val().toLowerCase();
            if(userField!="" && userLabel!=""){
                noOfFieldAdded++;
                var divId='row_no_'+rowCount;
                var labelId=userLabel+'_'+rowCount;
                var fieldId=userLabel+'_'+userField+'_'+rowCount;
                var fieldPlaceHolder='Please Enter your '+userLabel;
                var removeButtonId='removeButton_'+rowCount;
                $('#customAddedFields').append('<div id="'+divId+'"></div>');
                // setting a css property for Div
                $('#'+divId).css({
                    'padding':'10px'
                });
                $('#'+divId).append('<label id="'+labelId+'" for="'+fieldId+'">'+userLabel+'</label>:&nbsp;&nbsp;&nbsp;');
                $('#'+divId).append('<input type="'+userField+'" id="'+fieldId+'"  placeholder="'+fieldPlaceHolder+'">&nbsp;&nbsp;&nbsp;');
                $('#'+divId).append('<button id="'+removeButtonId+'"><span>&times;</span></button>');
                // setting a css property for remove button
                $('#'+removeButtonId).css({
                    'background-color':'rgb(138, 2, 2)',
                    'border':'none',
                    'border-radius':'5px',
                    'color':'white',
                    'cursor':'pointer',
                });
                $('#'+removeButtonId).hover(function(e){
                    $(this).css({
                        'background-color':e.type==='mouseenter'?'rgb(185, 55, 55)':'rgb(138, 2, 2)',
                    });
                });
                
                $('#userLabel').val('');
                rowCount++;
                // removig the custom field
                $('#'+removeButtonId).click(function(event){
                    event.preventDefault();
                    $('#'+divId).hide();
                    noOfFieldAdded--;
                    
                    // if last element removed then hide save 
                    if(noOfFieldAdded<=0){
                        $('#saveCustomButtonDiv').hide();
                    }
                });
                // showing save button
                $('#saveCustomButtonDiv').show();

                // displaying contents of custom fields
                $('#saveCustomButton').click(function(event){
                    //console.log($('#'+fieldId).attr('type')); (a way to get the type of element)
                    if(noOfFieldAdded>=1){
                        file_count++;
                        // if the data from custom field have image
                        var field_type=$('#'+fieldId).attr('type');
                        if(field_type=='file'){
    
                            const file =  $('#'+fieldId).prop('files')[0]; 
                            if (file){ 
                            let reader = new FileReader(); 
                            reader.onload = function(event){ 
                                file_value=event.target.result;
                                //console.log(file_value); 
                                $('#displayCustomFieldContentsWrapper').show();
                                $('#displayCustomFieldContentsWrapper').append('<P>'+userLabel+':<img src="'+file_value+'" id="'+fieldId+file_count+'"></P>');
                                $('#'+fieldId).val('');
                                $('#'+fieldId+file_count).css({
                                    'width':'15%',
                                    'border':'1px dashed teal',
                                });
                            }
                           
                            reader.readAsDataURL(file); 
                            }    
                        }

                        // if data have no image but other things
                        else{
                        var field_values=[];
                        var value_id='value_'+fieldId;
                        field_values=$('#'+fieldId).val();
                        if(field_values!=""){
                            $('#displayCustomFieldContentsWrapper').show();
                            $('#displayCustomFieldContentsWrapper').append('<p id="'+value_id+'">'+userLabel+': ' +field_values+'</p>');
                            $('#'+fieldId).val('');
                        }
                    }
                    }
                });
                
            }

            
           

        });
    },
    
    init:function(){
        this.toggleForm();
        this.addLabelAndFields();
    },
};

// preview multiple images at once.
var multipleImageHandling={
    multipleImagePreview:function(){
        $('#multipleImageUpload').change(function(){
            var multipleFileCount=0;
            var file=this.files;
            var multiple_files=[];
            for(var i=0;i<file.length;i++){
                multipleFileCount++;
                multiple_files=file[i];
               console.log(multiple_files);
               if(multiple_files){
                   var multipleFileId =  multiple_files.name +'_'+ multipleFileCount; 
                    let reader = new FileReader();
                    reader.onload=function(event){
                        $('#multipleImagePreviewDiv').show();
                        $('#multipleImagePreviewDiv').append('<img src="'+ event.target.result + '" id="'+ multipleFileId +'">');
                       $('#'+multipleFileId).css({
                                     'width':'15%',
                                     'border':'1px dashed teal',
                                 });
                    }
                    reader.readAsDataURL(multiple_files); 
                }
            }
            
        });
    },
    init:function(){
        this.multipleImagePreview();
    },
};



$(document).ready(function(){
    formToggle.init();
    fileUpload.init();
    filePreview.init();
    addCustomFields.init();
    multipleImageHandling.init();
});
