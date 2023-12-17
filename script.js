const mainApiURL = 'https://table-data.onrender.com/scrape';

const dataCardsContainer = document.querySelector('#data_cards');

// Add a loading spinner to the container
dataCardsContainer.innerHTML = '<div class="loading-spinner">Loading...</div>';
var allFetchedData=[]
var allMainData = [];

getData(mainApiURL).
then((mainData) => {
  allMainData = mainData
  // Iterate over each item in the mainData
  mainData.forEach(async (item, i) => {
    if (i !== 0) {

      // Make a subsequent API call for each item
      // const detailsData = 
      await getData(`${mainApiURL}?id=${item[0]}`,async (detailsData)=>{
        // Use the detailsData to construct your HTML
        const html = `<div id="job_${i}" class="jet-listing-grid__item jet-listing-dynamic-post-7478" data-post-id="7478"><div class="jet-engine-listing-overlay-wrap" style='cursor:auto'>		<div data-elementor-type="jet-listing-items" data-elementor-id="461" class="elementor elementor-461" data-elementor-post-type="jet-engine">
        <section class="elementor-section elementor-top-section elementor-element elementor-element-859a754 elementor-section-boxed elementor-section-height-default elementor-section-height-default" data-id="859a754" data-element_type="section" data-settings="{&quot;background_background&quot;:&quot;classic&quot;,&quot;jet_parallax_layout_list&quot;:[{&quot;jet_parallax_layout_image&quot;:{&quot;url&quot;:&quot;&quot;,&quot;id&quot;:&quot;&quot;,&quot;size&quot;:&quot;&quot;},&quot;_id&quot;:&quot;0e50812&quot;,&quot;jet_parallax_layout_image_laptop&quot;:{&quot;url&quot;:&quot;&quot;,&quot;id&quot;:&quot;&quot;,&quot;size&quot;:&quot;&quot;},&quot;jet_parallax_layout_image_tablet_extra&quot;:{&quot;url&quot;:&quot;&quot;,&quot;id&quot;:&quot;&quot;,&quot;size&quot;:&quot;&quot;},&quot;jet_parallax_layout_image_tablet&quot;:{&quot;url&quot;:&quot;&quot;,&quot;id&quot;:&quot;&quot;,&quot;size&quot;:&quot;&quot;},&quot;jet_parallax_layout_image_mobile_extra&quot;:{&quot;url&quot;:&quot;&quot;,&quot;id&quot;:&quot;&quot;,&quot;size&quot;:&quot;&quot;},&quot;jet_parallax_layout_image_mobile&quot;:{&quot;url&quot;:&quot;&quot;,&quot;id&quot;:&quot;&quot;,&quot;size&quot;:&quot;&quot;},&quot;jet_parallax_layout_speed&quot;:{&quot;unit&quot;:&quot;%&quot;,&quot;size&quot;:50,&quot;sizes&quot;:[]},&quot;jet_parallax_layout_type&quot;:&quot;scroll&quot;,&quot;jet_parallax_layout_direction&quot;:null,&quot;jet_parallax_layout_fx_direction&quot;:null,&quot;jet_parallax_layout_z_index&quot;:&quot;&quot;,&quot;jet_parallax_layout_bg_x&quot;:50,&quot;jet_parallax_layout_bg_x_laptop&quot;:&quot;&quot;,&quot;jet_parallax_layout_bg_x_tablet_extra&quot;:&quot;&quot;,&quot;jet_parallax_layout_bg_x_tablet&quot;:&quot;&quot;,&quot;jet_parallax_layout_bg_x_mobile_extra&quot;:&quot;&quot;,&quot;jet_parallax_layout_bg_x_mobile&quot;:&quot;&quot;,&quot;jet_parallax_layout_bg_y&quot;:50,&quot;jet_parallax_layout_bg_y_laptop&quot;:&quot;&quot;,&quot;jet_parallax_layout_bg_y_tablet_extra&quot;:&quot;&quot;,&quot;jet_parallax_layout_bg_y_tablet&quot;:&quot;&quot;,&quot;jet_parallax_layout_bg_y_mobile_extra&quot;:&quot;&quot;,&quot;jet_parallax_layout_bg_y_mobile&quot;:&quot;&quot;,&quot;jet_parallax_layout_bg_size&quot;:&quot;auto&quot;,&quot;jet_parallax_layout_bg_size_laptop&quot;:&quot;&quot;,&quot;jet_parallax_layout_bg_size_tablet_extra&quot;:&quot;&quot;,&quot;jet_parallax_layout_bg_size_tablet&quot;:&quot;&quot;,&quot;jet_parallax_layout_bg_size_mobile_extra&quot;:&quot;&quot;,&quot;jet_parallax_layout_bg_size_mobile&quot;:&quot;&quot;,&quot;jet_parallax_layout_animation_prop&quot;:&quot;transform&quot;,&quot;jet_parallax_layout_on&quot;:[&quot;desktop&quot;,&quot;tablet&quot;]}]}">
        <div class="elementor-container elementor-column-gap-default">
        <div class="elementor-column elementor-col-100 elementor-top-column elementor-element elementor-element-a3ec7af" data-id="a3ec7af" data-element_type="column" style='height: 600px !important;overflow: hidden !important;'>
        <div class="elementor-widget-wrap elementor-element-populated">
        <div class="elementor-element elementor-element-53c900e elementor-widget elementor-widget-image" data-id="53c900e" data-element_type="widget" data-widget_type="image.default">
        <div class="elementor-widget-container">
                                <img width="354" height="200" src=${detailsData[2] != '' ? detailsData[2]: 'https://vetrelief.com/tmpl/images2/VetRelief-Logo-COLOR-withoutappicons.png'} class="attachment-full size-full wp-image-3390" alt="" data-lazy-srcset="${detailsData[2] != '' ? detailsData[2]: 'https://vetrelief.com/tmpl/images2/VetRelief-Logo-COLOR-withoutappicons.png'} 354w, ${detailsData[2] != '' ? detailsData[2]: 'https://vetrelief.com/tmpl/images2/VetRelief-Logo-COLOR-withoutappicons.png'} 300w" data-lazy-sizes="(max-width: 354px) 100vw, 354px" data-lazy-src="${detailsData[2] != '' ? detailsData[2]: 'https://vetrelief.com/tmpl/images2/VetRelief-Logo-COLOR-withoutappicons.png'}"><noscript><div<img width="354" height="200" src=${detailsData[2] != '' ? detailsData[2]: 'https://vetrelief.com/tmpl/images2/VetRelief-Logo-COLOR-withoutappicons.png'} class="attachment-full size-full wp-image-3390" alt="" srcset="${detailsData[2] != '' ? detailsData[2]: 'https://vetrelief.com/tmpl/images2/VetRelief-Logo-COLOR-withoutappicons.png'} 354w, ${detailsData[2] != '' ? detailsData[2]: 'https://vetrelief.com/tmpl/images2/VetRelief-Logo-COLOR-withoutappicons.png'} 300w" sizes="(max-width: 354px) 100vw, 354px" /></noscript>															</div>
        </div>
        <section class="elementor-section elementor-inner-section elementor-element elementor-element-06975b9 elementor-section-height-min-height elementor-section-boxed elementor-section-height-default" data-id="06975b9" data-element_type="section" data-settings="{&quot;jet_parallax_layout_list&quot;:[{&quot;jet_parallax_layout_image&quot;:{&quot;url&quot;:&quot;&quot;,&quot;id&quot;:&quot;&quot;,&quot;size&quot;:&quot;&quot;},&quot;_id&quot;:&quot;5376163&quot;,&quot;jet_parallax_layout_image_laptop&quot;:{&quot;url&quot;:&quot;&quot;,&quot;id&quot;:&quot;&quot;,&quot;size&quot;:&quot;&quot;},&quot;jet_parallax_layout_image_tablet_extra&quot;:{&quot;url&quot;:&quot;&quot;,&quot;id&quot;:&quot;&quot;,&quot;size&quot;:&quot;&quot;},&quot;jet_parallax_layout_image_tablet&quot;:{&quot;url&quot;:&quot;&quot;,&quot;id&quot;:&quot;&quot;,&quot;size&quot;:&quot;&quot;},&quot;jet_parallax_layout_image_mobile_extra&quot;:{&quot;url&quot;:&quot;&quot;,&quot;id&quot;:&quot;&quot;,&quot;size&quot;:&quot;&quot;},&quot;jet_parallax_layout_image_mobile&quot;:{&quot;url&quot;:&quot;&quot;,&quot;id&quot;:&quot;&quot;,&quot;size&quot;:&quot;&quot;},&quot;jet_parallax_layout_speed&quot;:{&quot;unit&quot;:&quot;%&quot;,&quot;size&quot;:50,&quot;sizes&quot;:[]},&quot;jet_parallax_layout_type&quot;:&quot;scroll&quot;,&quot;jet_parallax_layout_direction&quot;:null,&quot;jet_parallax_layout_fx_direction&quot;:null,&quot;jet_parallax_layout_z_index&quot;:&quot;&quot;,&quot;jet_parallax_layout_bg_x&quot;:50,&quot;jet_parallax_layout_bg_x_laptop&quot;:&quot;&quot;,&quot;jet_parallax_layout_bg_x_tablet_extra&quot;:&quot;&quot;,&quot;jet_parallax_layout_bg_x_tablet&quot;:&quot;&quot;,&quot;jet_parallax_layout_bg_x_mobile_extra&quot;:&quot;&quot;,&quot;jet_parallax_layout_bg_x_mobile&quot;:&quot;&quot;,&quot;jet_parallax_layout_bg_y&quot;:50,&quot;jet_parallax_layout_bg_y_laptop&quot;:&quot;&quot;,&quot;jet_parallax_layout_bg_y_tablet_extra&quot;:&quot;&quot;,&quot;jet_parallax_layout_bg_y_tablet&quot;:&quot;&quot;,&quot;jet_parallax_layout_bg_y_mobile_extra&quot;:&quot;&quot;,&quot;jet_parallax_layout_bg_y_mobile&quot;:&quot;&quot;,&quot;jet_parallax_layout_bg_size&quot;:&quot;auto&quot;,&quot;jet_parallax_layout_bg_size_laptop&quot;:&quot;&quot;,&quot;jet_parallax_layout_bg_size_tablet_extra&quot;:&quot;&quot;,&quot;jet_parallax_layout_bg_size_tablet&quot;:&quot;&quot;,&quot;jet_parallax_layout_bg_size_mobile_extra&quot;:&quot;&quot;,&quot;jet_parallax_layout_bg_size_mobile&quot;:&quot;&quot;,&quot;jet_parallax_layout_animation_prop&quot;:&quot;transform&quot;,&quot;jet_parallax_layout_on&quot;:[&quot;desktop&quot;,&quot;tablet&quot;]}]}">
        <div class="elementor-container elementor-column-gap-default">
        <div class="elementor-column elementor-col-100 elementor-inner-column elementor-element elementor-element-a46f530" data-id="a46f530" data-element_type="column">
        <div class="elementor-widget-wrap elementor-element-populated">
        <div class="elementor-element elementor-element-710eaa1 elementor-widget__width-inherit elementor-widget elementor-widget-text-editor" data-id="710eaa1" data-element_type="widget" data-widget_type="text-editor.default">
        <div class="elementor-widget-container">
        ${detailsData[4]}						</div>
        </div>
        <div class="elementor-element elementor-element-2535909 elementor-widget__width-auto jedv-enabled--yes elementor-widget elementor-widget-text-editor" data-id="2535909" data-element_type="widget" data-widget_type="text-editor.default">
        <div class="elementor-widget-container">
        ${detailsData[0]} ${detailsData[1]}</div>
        </div>
        <div class="elementor-element elementor-element-349f58c elementor-widget elementor-widget-text-editor" data-id="349f58c" data-element_type="widget" data-widget_type="text-editor.default">
        <div class="elementor-widget-container">
        Listing Number: ${mainData[i][0]}</div>
        </div>
        <div class="elementor-element elementor-element-349f58c elementor-widget elementor-widget-text-editor" data-id="349f58c" data-element_type="widget" data-widget_type="text-editor.default">
        <div class="elementor-widget-container">
        ${detailsData[3].substring(1, 120)}...<a class='read_more' href='#job_${i}' style='font-size:20px'>Read more</a></div>
        </div>
        </div>
        </div>
        </div>
        </section>
        <div class="elementor-element elementor-element-a5e9d8d elementor-widget elementor-widget-button" data-id="a5e9d8d" data-element_type="widget" data-widget_type="button.default">
        <div class="elementor-widget-container">
        <div class="elementor-button-wrapper">
        <a class="elementor-button elementor-button-link elementor-size-sm" href="https://vetrelief.com/doctorlogin/?page=jobs_perm&sub=detail&id=${mainData[i][0]}">
        <span class="elementor-button-content-wrapper">
        <span class="elementor-button-text">View Listing »</span>
        </span>
        </a>
        </div>
        </div>
        </div>
        </div>
        </div>
        </div>
        </section>
        </div>
        </div></div>`;
  
        // Append the generated HTML to the dataCardsContainer
        if (mainData[i][0] !== '104845' && mainData[i][0] !== '108262' ) {
          dataCardsContainer.innerHTML += html;
        }else{
          dataCardsContainer.innerHTML += `<a style='display:none' class='read_more' href='#job_${i}' style='font-size:20px'>Read more</a>`
        }
        
   
        if (i==1) {
          document.querySelector('.loading-spinner').innerHTML = '';
      }
  
      console.log(i)
  
      // if (i == mainData.length-1) {
        console.log('yes I call event creator')
        addClickEvent(mainData)
      // }

      
      });

    }
  });
})



async function getData(file,callback1 = (data)=>{console.log('default')}, callback = (data) => {
  console.log(data);
  if (file.includes('?id=')) {
    allFetchedData.push(data)

  }
  callback1(data)
}) {

  try {
    const response = await fetch(file);
    const text = await response.text();
    const parsedData = JSON.parse(text);
    callback(parsedData);
    // callback1(parsedData)
    return parsedData;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
}


function addClickEvent(Alldata){
  console.log(Alldata)
  console.log(document.querySelectorAll(".jet-listing-grid__item.jet-listing-dynamic-post-7478"))
  document.querySelectorAll(".read_more").forEach((el,index)=>{
    el.addEventListener('click',()=>{
      const modal = `<div class="modal" id="modal">
        <div class="modal-content">
          <a style="cursor: pointer;" onclick="removeModal()" class="modal-close" title="Close Modal">X</a>
          <h3>${Alldata[index+1][1]}</h3>
          <div class="modal-area">
          <img src="${allFetchedData[index][2] != '' ? allFetchedData[index][2]: 'https://vetrelief.com/tmpl/images2/VetRelief-Logo-COLOR-withoutappicons.png'}">
          <h5 style="color:black">City:</h5><span> ${allFetchedData[index][0]}</span>
          <h5 style="color:black">State:</h5><span> ${allFetchedData[index][1]}</span>
          <h5 style="color:black">DESCRIPTION</h5>
            ${allFetchedData[index][3]}   
          </div>
        </div>
      </div>`
        document.getElementById("wrapper").innerHTML = modal
    })
  })

  // for (let index = 1; index < Alldata.length; index++) {
  //   document.getElementById("job_"+index).addEventListener('click',()=>{
  //     console.log([
  //       Alldata[index],
  //       allFetchedData[index-1]
  //     ])
  //     console.log(Alldata)
  //       const modal = `<div class="modal" id="modal">
  //       <div class="modal-content">
  //         <a style="cursor: pointer;" onclick="removeModal()" class="modal-close" title="Close Modal">X</a>
  //         <h3>${Alldata[index][1]}</h3>
  //         <div class="modal-area">
  //         <img src="${allFetchedData[index-1][2] != '' ? allFetchedData[index-1][2]: 'https://vetrelief.com/tmpl/images2/VetRelief-Logo-COLOR-withoutappicons.png'}">
  //         <h5 style="color:black">State:</h5><span> ${allFetchedData[index-1][0]}</span>
  //         <h5 style="color:black">City:</h5><span> ${allFetchedData[index-1][1]}</span>
  //         <h5 style="color:black">DESCRIPTION</h5>
  //           ${allFetchedData[index-1][3]}   
  //         </div>
  //       </div>
  //     </div>`
  //       document.getElementById("wrapper").innerHTML = modal
  //   })
  // }
}


function removeModal() {
  document.querySelector('.modal').remove()
}