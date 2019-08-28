/* eslint-disable */
const options = {
  valueNames: [
    'invaderName',
    'defenderName',
  ],
  page: 8,
  pagination: true,
};
const battlesList = new List('battles-list', options);

function resetList(){
	battlesList.search();
	battlesList.filter();
	battlesList.update();
	$(".filter-all").prop('checked', true);
	$('.filter').prop('checked', false);
	$('.search').val('');
};

const capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
  }

function updateList(){
  var values_all = $("input[name=combatant]:checked").val();

  var searchItem = document.getElementById('searchBar').value;
  var capitalizedSearchItem = capitalize(searchItem);

	battlesList.filter(function (item) {
        var combatantFilter = false;
		
        if(values_all == 'invader' 
        && (item.values().invaderName.includes(searchItem)
        || (item.values().invaderName.includes(capitalizedSearchItem)
        ))) {
			combatantFilter = true;
        } else 
        if (values_all == 'defender' 
        && (item.values().defenderName.includes(searchItem)
        || (item.values().defenderName.includes(capitalizedSearchItem)
        )))  {
            combatantFilter = true;
        } else if (values_all == 'all' || values_all == null){
            combatantFilter = true;
        } else {
            combatantFilter = false;
        }
		return combatantFilter
	});
	battlesList.update();
}
                               
$(function(){
  $("input[name=combatant]").change(updateList);
	
	battlesList.on('updated', function (list) {
		if (list.matchingItems.length > 0) {
			$('.no-result').hide()
		} else {
			$('.no-result').show()
		}
	});
});