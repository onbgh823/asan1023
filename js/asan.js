(function ($) {
  
  // 로고를 클릭하면 main.html의 #content를 load() 하시오.
  $('#wrap')
  .on("click", "#header h1 a, #footer .quickMenu a, .mainContent #step_area a, .contTit .prev a", function () {
      var url = this.href;
      $("#container > #content").remove();
      $("#container").load(url + " #content");
      return false;
    }
  );
//  .medicalContent .mediList a, 제거

// `<li><div class="img"><img src="${photo}" alt=""></div>`
// `<div class="doctorInfo"><strong>${name}</strong>`
// `<p>${depart}</p>`
// `<div>${about}</div></div></li>`


var usedata;
$.ajax({
  type: 'GET',
  url: 'data/doctors.json',
  beforeSend: function (xhr) {
    if (xhr.overrideMimeType) {
      xhr.overrideMimeType('application/json');
    }
  },
  success:function(data){
    usedata = data
  },
  error:function(abc){
    alert(abc.status + '오류발생')
  }
})


$('#container').on('click', '.medicalContent .mediList a', function(e){
  e.preventDefault()
  var url = this.href;
  var part = this.id;
    $("#container > #content").remove();
    $("#container").load(url + " #content", function(){
      var newContent = '';
    
      for( var i in usedata[part]) {
        newContent += `<li><div class="img"><img src="${usedata[part][i].photo}" alt=""></div>`
        newContent += `<div class="doctorInfo"><strong>${usedata[part][i].name}</strong>`
        newContent += `<p>${usedata[part][i].depart}</p>`
        newContent += `<div>${usedata[part][i].about}</div></div></li>`
      }
      $('#content .part1DoctorList').html(`<ul>${newContent}</ul>`)

    });

    

})



  // 헤더박스는 스크롤이벤트시 픽스드됨
  $(window).scroll(function(){
    var sct = $(this).scrollTop()
    if (sct>=50 && !$('#header').hasClass('on') ){
      $('#header').slideUp(100).slideDown(100)
      .addClass('on')
    } else if (sct<50 && $('#header').hasClass('on') ) {
      $('#header').removeClass('on')
    }

  })
 


  // 뒤로가기 버튼
 

    
})(jQuery);
