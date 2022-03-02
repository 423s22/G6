This class will use polaris to design the interface
this will have the prices show at the bottom and it 
will get the price  from products sum and when a box
is clicked it will call the admin process to get an 
updated price

$(document).ready(()=> {
    const $productDiv = $('#products');
    $.get('/products/').then(response => {
        let template = <ul class="Polaris-ResourceList">`;
        $.each(response.edges, function(i, edge){
            template += `<li class="Polaris-ResourceList__ItemWrapper"> <div class="Polaris-ResourceItem Polaris-ResourceItem--persistActions"> <a class="Polaris-ResourceItem__Link" data-polaris-unstyled="true"></a> <div class="Polaris-ResourceItem__Container"> <div class="Polaris-ResourceItem__Content"> <h3><span class="Polaris-TextStyle--variationStrong">${edge.node.title}</span></h3> </div> </div> </div> </li>`;
        });
        template += `</ul>`; $productDiv.append(template);
    });
});
