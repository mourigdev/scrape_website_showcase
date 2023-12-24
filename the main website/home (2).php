<script type="text/javascript">
//Polyfill children so IE can build the table.
;(function(constructor) {
  if (constructor &&
    constructor.prototype &&
    constructor.prototype.children == null) {
    Object.defineProperty(constructor.prototype, 'children', {
      get: function() {
        let i = 0, node, nodes = this.childNodes, children = [];
        while (node = nodes[i++]) {
          if (node.nodeType === 1) {
            children.push(node);
          }
        }
        return children;
      }
    });
  }
})(window.Node || window.Element);

</script>

<script>
		function buildTable(xml)
		{
			var parser = new DOMParser();
			xml = parser.parseFromString(xml, "text/xml");
			//console.log(xml);
		
			var table, jobs, row, text, temp, a;
			var cells = [];
			table = document.getElementById("lookingdata");

					jobs = xml.getElementsByTagName("data")[0].children;

					for (var i = 0; i < jobs.length; i++)
					{
						row = document.createElement("tr");
						for (var c = 0; c < 4 ; c++)
						{
							cells[c] = document.createElement("td");
							try	//In case of empty text.
							{
								//Javascript has some dumb shenanigans where children and childNodes do different things.
								//children only refers to elements, while childNodes refers to everything between the tags, with no elegant way to make sure we get the text we want.
								//Therefore, childNodes[0] is kinda hacky, but it works because the xml we're receiving is pretty predictable.
								temp = jobs[i].children[c].childNodes[0].nodeValue
								text = document.createTextNode(temp);

								if(c == 0 || c == 3)
								{
									a = document.createElement("a");
									a.href = "<?php echo VRS_RUNTIME_WWW::url_root(); ?>doctorlogin/?page=jobs_relief&sub=detail&id=" + jobs[i].children[0].childNodes[0].nodeValue;
									a.appendChild(text);
									text = a;
								}
							}
							catch (error)
							{
								text = document.createTextNode("");
							}
							cells[c].className = "c" + (c + 1)
							cells[c].appendChild(text);
							row.appendChild(cells[c]);
						}
						table.appendChild(row);
					}
		}
	</script>

<?php
	INCLUDE_ONCE(GLOBAL_UNIX_PATH . 'libs/class/VRS_BID_SEARCH.php');
	INCLUDE_ONCE(GLOBAL_UNIX_PATH . 'libs/class/VRS_BID.php');
	INCLUDE_ONCE(GLOBAL_UNIX_PATH . 'libs/class/VRS_ISPY.php');
	INCLUDE_ONCE(GLOBAL_UNIX_PATH . 'libs/class/VRS_NEWS.php');
	INCLUDE_ONCE(GLOBAL_UNIX_PATH . 'libs/class/VRS_JOB_UTIL.php');
	INCLUDE_ONCE(GLOBAL_UNIX_PATH . 'libs/class/VRS_HOSP_UTIL.php');

	$site = VRS_RUNTIME_WWW::site();
	$auth_user = VRS_RUNTIME_WWW::authenticated_user();
	$auth_last_name = $auth_user['last_name'];
	$auth_login = $auth_user['login'];

	echo "<h1>Welcome Dr. $auth_last_name</h1>";

	/*
		PENDING BIDS
	*/
	$search_pend_bids = New VRS_BID_SEARCH($site);
	$search_pend_bids->CFG_WHERE_SPEC_DOC($auth_login);
	$search_pend_bids->CFG_WHERE_STEP_MODE('pend');
	$search_pend_bids->CFG_WHERE_START_DATE('now');	
	$search_pend_bids->prepare();

	if(!($pend_bids = $search_pend_bids->QUERY_VRS_JOB_BID_LIST('date_min','ASC'))) {
		// echo "No Pending Bids were found.";
	} else {
		$num_bid = count($pend_bids);
		echo "<style>
		@media (max-width: 992px) {
			#SideBar,
			#menu,
			#header,
			#mainContent h1,
			.GenLayout #footer{
				display: none;
			}
			.GenLayout #mainContent,
		    {
				width: 100%;
			}
			.GenLayout #mainContent {
				width: 95%;
				padding: 2.5%;
			}
			html {
				background-color: #FFF;
			}
		}
		</style>";
		echo "<div class='home-sizing'>";
		echo "<h2>Pending Bids:</h2>
		<table border=\"0\" cellpadding=\"3\" cellspacing=\"0\" style='width: 100%;'>
			<tr>
				<td><b>Bid ID</b></td>
				<td><b>" . VRS_SITE::LANG_FACILITY. "</b></td>
				<td><b>Job Kind</b></td>
				<td><b>Status</b></td>
			</tr>";

		foreach($pend_bids as $tmp_pending_bid) {
			$tmp_bid_id = $tmp_pending_bid->id();

			// Create Bid manager Object.
			$tmp_bid_mgr = VRS_BID::open($site, $tmp_bid_id);
			$tmp_kind = VRS_JOB_UTIL::query_kind($site, $tmp_bid_mgr['job_id']);
			$tmp_hosp_name = VRS_HOSP_UTIL::query_name($site, VRS_JOB_UTIL::query_hosp_id($site, $tmp_bid_mgr['job_id']));
			
			if($tmp_bid_mgr->mystep_waiting_for_doc()) {
				$tmp_status_txt = "<a href=\"./?page=bids&sub=detail&bid_id=" . $tmp_bid_id . "\"> * Please Reply * </a>";
			} elseif($tmp_bid_mgr->mystep_waiting_for_hosp()) {
				$tmp_status_txt = "Waiting for the " . VRS_SITE::LANG_FACILITY. " to Reply";
			}

			echo "<tr>
				<td align=\"center\"><a href=\"./?page=bids&sub=detail&bid_id=" . $tmp_bid_id . "\">" . $tmp_bid_id . "</a></td>
				<td align=\"center\">" . $tmp_hosp_name . "</td>
				<td align=\"center\">" . $tmp_kind . "</td>
				<td align=\"center\">" . $tmp_status_txt . "</td>
			</tr>";
		} // end for each pending bid		
		echo "</table>";
		echo "</div>";
	}
	$search_pend_bids = null;
	
	/*
		Display ISPY if applicable	
	*/
	if(VRS_LOGIN_UTIL::query_can_ispy($site, $auth_login)) {
		$ispy_search = New VRS_ISPY($site);
		$ispy_search->CFG_WHERE_SPEC_DOC($auth_login);
		$ispy_search->lock();
		
		if(!($ispys = $ispy_search->QUERY_LIST('hosp_name','asc'))) {
			//echo "No matching records found.";
		} else {
			$num_ispy = count($ispys);
			
			if ($num_ispy > 1) {
				$request = 'Requests';
			} else {
				$request = 'Request';
			}
			echo "<div class=\"pending\"><p><br /><b>Please provide - Schedule Update $request</b><br /><br /><ul>";
			foreach($ispys as $tmp_ispy) {
				// lookup hospital name.
				$tmp_bid_mgr = VRS_BID::open($site, $tmp_ispy['bid_id']);
				$tmp_hosp_name = VRS_HOSP_UTIL::query_name($site, VRS_JOB_UTIL::query_hosp_id($site, $tmp_bid_mgr['job_id']));

				echo "<li><a href=\"" . VRS_RUNTIME_WWW::url_root() . "doctorlogin/?page=bids&sub=detail&bid_id=" . $tmp_ispy['bid_id'] . "&detail_mode=sched_update\">" . $tmp_ispy['bid_id'] . " ( " . $tmp_hosp_name . " )</a></li>";
			}
			echo "</ul></p></div><br /><br />";	
		}
	}
	
	/*
		Paperwork Requests
	*/
	
	$search_paper_bids = New VRS_BID_SEARCH($site);
	$search_paper_bids->CFG_WHERE_SPEC_DOC($auth_login);
	$search_paper_bids->CFG_WHERE_STEP_MODE('need_paper_doc');
	$search_paper_bids->CFG_WHERE_START_DATE('now');	
	$search_paper_bids->prepare();

	$num_paper_bids =  $search_paper_bids->COUNT_BID_ID();

	if($num_paper_bids) {
		if ($num_paper_bids > 1) {
			$agreements = 'Agreements';
		} else {
			$agreements = 'Agreement';
		}
		echo "<div class=\"pending\"><p><br /><b>Please confirm $agreements</b><br /><br />
    <ul>";
		$paper_bids = $search_paper_bids->QUERY_VRS_JOB_BID_LIST('date_min','ASC');
		foreach($paper_bids as $tmp_paper_bid) {
			$tmp_bid_id = $tmp_paper_bid->id();
			$tmp_bid_mgr = VRS_BID::open($site, $tmp_bid_id);
			$tmp_hosp_name = VRS_HOSP_UTIL::query_name($site, VRS_JOB_UTIL::query_hosp_id($site, $tmp_bid_mgr['job_id']));

			echo "<li><a href=\"./?page=bids&sub=detail&bid_id=" . $tmp_bid_id . "\">" . $tmp_bid_id . " ( " . $tmp_hosp_name . " )</a>";
			
			echo "<form action=\"./\" method=\"post\">
				<input type=\"hidden\" name=\"page\" value=\"bids\">
				<input type=\"hidden\" name=\"sub\" value=\"accept\">
				<input type=\"hidden\" name=\"bid_id\" value=\"$tmp_bid_id\">
				<input type=\"hidden\" name=\"hosp_name\" value=\"" . $tmp_hosp_name . "\">
				<input type=\"submit\" value=\"" . VRS_SITE::LANG_ACCEPT_CONTRACT_BUTTON . "\"></td>
				</form>";
			
			echo "</li>";
		}		
		echo "</ul></p></div><br /><br />";
	}
	$search_paper_bids = null;
	
	$this->show_page('map_h');
	include_once(GLOBAL_UNIX_PATH . "libs/class/VRS_FEATURED_ADS.php");
	$ads = new VRS_FEATURED_ADS(VRS_RUNTIME_WWW::site());
	$images = $ads->getDoctorAds();
	?>
	<span class="sponsored-text">VetRelief.com Sponsored Jobs (Click image for more info)</span>
	<div class="ad-carousel">
	  <?php 
	  	foreach ($images as $image) {
	  		echo "<div style=\"text-align: center;\">";
	  
	  		echo "<a href=\"" . $image['link'] . "\" target=\"_blank\"><img src=\"" . VRS_RUNTIME_WWW::url_root() . VRS_FEATURED_ADS::IMAGE_PATH . $image['image_name'] . "\" /></a>";
	  		
	  		echo "</div>";
	  	} ?>
	</div>
		<div style="padding: 10px;">
  <?php
	/*
		NEWS
	*/
	if(VRS_NEWS::visible($site, 'doc', $auth_login)) {
		echo VRS_NEWS::display($site, 'doc');
		echo "<form method=\"POST\" action=\"./\"><input type=\"hidden\" name=\"page\" value=\"home\"><input type=\"hidden\" name=\"sub\" value=\"hide_news\"><input type=\"hidden\" name=\"hide_news\" value=\"1\"><input type=\"submit\" value=\"Hide News\"></form>";
	} else {
		echo "<a id='news-link' href=\"./?page=home&sub=news\">View News</a>";
	}
	$this->show_page('map');
	$this->show_page('map_script');
?>
</div>
<style>
.small_table_wrapper{
	width:48%;
	float:left;
	overflow-x:hidden;
	height: 350px;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    margin-right: 2%;
}

@media only screen and (max-width: 768px) {
	.small_table_wrapper{
	width:100%;
	margin-right: 0;
}
}

.looking2{
	width: 100%;
}	

.outer-space {
	overflow: hidden;
}

.box {
	margin:0 auto;
	position: relative;
	z-index: 2;
	padding:10px 0;
}
.box-wrapper {
	position: relative;
	width:100%;
	max-width: 600px;
	margin:0 auto;
}
.box-wrapper:before, .box-wrapper:after {
	content:"";
	position: absolute;
	height:100%;
	width:100vw;
	top: 0;
	z-index: 1;
}
.box-wrapper:before {
	left:-100%;
}
.box-wrapper:after {
	right:-100%;
}

span {
	text-align: center;
	display: block;
}

#lookingdata{
	width: 100% !important;
	border-spacing: 0 2px;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
	margin-top: -2px;
}

#lookingdata tr:first-child{
	background-color: #9EB0A0;	
}

#lookingdata th{
	text-align: center;
	background-color: #9EB0A0;
	color: white;
	padding: 10px 10px;
}

#lookingdata tr{
	background-color: #FFFFFF;
}

#lookingdata tr:last-child td{
	border: none;
}

#lookingdata td{
	padding: 8px 10px;
	background-color: #FFFFFF !important;
	border: none;
	border-bottom: 2px solid #00000017;
	text-align: left;
}

.c1{
	width: 10%;
}

.c2{
	width: 25%;
}

.c3{
	width: 25%;
}

.c4{
	width: 40%;
}

.table_header{
	width: 100%;
	padding: 10px;
	background-color: #9EB0A0;
}

.table_header h2{
	color: black;
	margin: 0;
}


</style>
<div class="small_table_wrapper">
	<div class="table_header"><h2>Bid generously on these urgent relief dates!</h2></div>
	<table id="lookingdata">
		<tr>
			<th>Job ID</th>
			<th>Hospital City</th>
			<th>Practice Type</th>
			<th>Dates</th>
		</tr>
	</table>
</div>

<script>
	$.ajax({
		url: "https://script.google.com/macros/s/AKfycbzXJu6AGhxmNGb7A89fF3DTBOVr83jxXXMi8bQ8QDGpe6ziYpitlifA9Q/exec?callback=buildTable",
		crossDomain: true,
		method: "GET",
		dataType: "jsonp",
		cache: false
	});
</script>