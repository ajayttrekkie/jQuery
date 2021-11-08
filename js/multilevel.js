var labelAndValues={
    
    
    label: function(){
        var count=1;
        var valueCount=1;
        $('#addLabel').click(function(event){
            event.preventDefault(); 
            $('#label-box').prepend('<div id="labels_'+count+'" class="border border-info p-4 form-group mb-5 " ></div>');
            $('#labels_'+count).append('<input class="form-control mt-1 mb-1" type="text" name="" id="label_input_'+count+'" placeholder="label"><button class="btn btn-danger mt-1 mb-1" id="label_remove_'+count+'">remove label&nbsp;&nbsp;<i class="fa fa-minus"></i></button><div class="mt-3 ml-5 mb-3 border border-warning p-3" id="values_'+count+'" ><div class="form-group" id="label_values_'+count+'"><button class="btn btn-primary mb-3" id="addValue_'+count+'">Add value&nbsp;&nbsp;<i class="fa fa-plus"></i></button></div>');
            // $('#labels_'+count).append('<button class="btn btn-primary mb-3" id="duplicate_label_'+count+'">Duplicate Label&nbsp;&nbsp;<i class="fa fa-plus"></i></button>');
            $('#labels_'+count).css({
                'margin-top':'30px',
            });
            count++;
        });

        
        document.addEventListener('click', function(e){
            e.preventDefault();
            var value_id =e.target.id;
            var parent = $('#'+value_id).parent().attr('id');
            if(e.target && value_id.includes('label_remove')){
                var noOfLabel=$('#label-box').find('div[id^="labels_"]').length;
                if(noOfLabel<=1){
                    alert('Must have atleast one label.');
                }else{
                    $('#'+parent).remove();
                }
            }
           
            if(e.target && value_id.includes('addValue')){
                $('#'+parent).append('<div class="form-group mt-2 mb-2" id="value_divs_'+count+'_'+valueCount+'"><input class="form-control mt-1 mb-1" type="text" name="" placeholder="value" id="value_input_'+count+'_'+valueCount+'"></input><button class="btn btn-danger mb-3" id="remove_value'+count+'_'+valueCount+'">remove value&nbsp;&nbsp;<i class="fa fa-minus"></i></button></div>');
                valueCount++;
            }
            if(e.target && value_id.includes('remove_value')){
                var noOfValueInLabel=$('#'+value_id).parent().parent().find('div[id^="value_divs_"]').length;
                if(noOfValueInLabel<=1){
                    alert('Must have atleast one value.')
                }else{
                    $('#'+parent).remove();
                }
            }          
            // if(e.target && value_id.includes('duplicate_label_')){
            //     var labelId=$('#'+parent).attr('id');
            //     var html=$('#'+labelId).parent().html();

            //     html.find('div[id^="labels_"]').attr('id','labels_'+count+'');
            //     html.find('input[id^="label_input_"]').attr('id','label_input_'+count+'');
            //     html.find('input[id^="label_input_"]').attr('id','label_input_'+count+'');
            //     html.find('button[id^="label_remove_"]').attr('id','label_remove_'+count+'');
            //     html.find('button[id^="label_remove_"]').attr('id','label_remove_'+count+'');
            //     html.find('div[id^="values_"]').attr('id','values_'+count+'');
            //     html.find('div[id^="label_values_"]').attr('id','label_values_'+count+'');
            //     html.find('button[id^="addValue_"]').attr('id','addValue_'+count+'');
            //     html.find('button[id^="duplicate_label_"]').attr('id','duplicate_label_'+count+'');
            //     $('#'+labelId).after(html);
            //     count++;
            // }          
        });  
    },

   eventClick:function(){
    document.addEventListener('click', function(e){
        e.preventDefault();
        var labelsCount=0;
        $('#label-box').find('input[id^="label_input_"]').each(function () {
            var labelId=  this.id;
            $('#'+labelId).attr('name','labels['+labelsCount+']');
           var valParentDiv = $('#'+labelId).parent().attr('id');
            var valueCounter=0;
           $('#'+valParentDiv).find('div[id^="label_values_"]').find('div[id^="value_divs_"]').find('input').each(function (){
              var valueInputId= this.id;
              $('#'+valueInputId).attr('name','values['+labelsCount+']['+valueCounter+']');
              valueCounter++;
           });
            labelsCount++;
        });
    });
   },

    init:function(){
        this.label();
        this.eventClick();
    },
};

$(document).ready(function(){
    labelAndValues.init();
});