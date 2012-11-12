var labelType, useGradients, nativeTextSupport, animate;

(function() {
  var ua = navigator.userAgent,
      iStuff = ua.match(/iPhone/i) || ua.match(/iPad/i),
      typeOfCanvas = typeof HTMLCanvasElement,
      nativeCanvasSupport = (typeOfCanvas == 'object' || typeOfCanvas == 'function'),
      textSupport = nativeCanvasSupport 
        && (typeof document.createElement('canvas').getContext('2d').fillText == 'function');
  //I'm setting this based on the fact that ExCanvas provides text support for IE
  //and that as of today iPhone/iPad current text support is lame
  labelType = (!nativeCanvasSupport || (textSupport && !iStuff))? 'Native' : 'HTML';
  nativeTextSupport = labelType == 'Native';
  useGradients = nativeCanvasSupport;
  animate = !(iStuff || !nativeCanvasSupport);
})();

var Log = {
  elem: false,
  write: function(text){
    if (!this.elem) 
      this.elem = document.getElementById('log');
    this.elem.innerHTML = text;
    this.elem.style.left = (500 - this.elem.offsetWidth / 2) + 'px';
  }
};


function init(){
    //init data
    var json = [{
        'label': ['Analysis', 'Awaiting Dev', 'Dev', 'Awaiting Testing', 'Testing', 'Awaiting Release'],
        'values': [
        {
          'label': 'Feature 1',
          'values': [40, 20, 15, 5, 5, 50]
        }, 
        {
          'label': 'Feature 2',
          'values': [30, 10, 45, 10, 10, 55]
        }, 
        {
          'label': 'Feature 3',
          'values': [38, 20, 35, 17, 10, 70]
        }, 
        {
          'label': 'Feature 4',
          'values': [58, 10, 35, 32, 10, 0]
        }, 
        {
          'label': 'Feature 5',
          'values': [55, 60, 34, 38, 5, 0]
        },  
        {
          'label': 'Feature 6',
          'values': [5, 15, 25, 14, 0, 0]
        }, 
        {
          'label': 'Feature 7',
          'values': [42, 30, 0, 0, 0, 0]
        }, 
        {
          'label': 'Feature 8',
          'values': [25, 35, 0, 0, 0, 0]
        },
        {
          'label': 'Feature 9',
          'values': [26, 0,0, 0,0,0]
		}, 
        {
          'label': 'Feature 10',
          'values': [26, 0,0, 0,0,0]
        }, 
        {
          'label': 'Feature 11',
          'values': [0, 0, 0, 0, 0,0]
        }],
        'color': ['#333','#FF0000','#666','#00FF00','#999','#0000FF']
        
    },{
        'label': ['Analysis', 'Awaiting Dev', 'Dev', 'Awaiting Testing', 'Testing', 'Awaiting Release'],
        'values': [
        {
          'label': 'Feature 1',
          'values': [40, 20, 15, 5, 5, 50]
        }, 
        {
          'label': 'Feature 2',
          'values': [30, 10, 45, 10, 10, 55]
        }, 
        {
          'label': 'Feature 3',
          'values': [38, 20, 35, 17, 10, 70]
        }, 
        {
          'label': 'Feature 4',
          'values': [58, 10, 35, 32, 10, 55]
        }, 
        {
          'label': 'Feature 5',
          'values': [55, 60, 34, 38, 5, 25]
        },  
        {
          'label': 'Feature 6',
          'values': [5, 15, 25, 14, 5, 50]
        }, 
        {
          'label': 'Feature 7',
          'values': [42, 30, 54, 35, 10, 75]
        }, 
        {
          'label': 'Feature 8',
          'values': [25, 35, 24, 30, 15, 85]
        },
        {
          'label': 'Feature 9',
          'values': [26, 40, 45, 0,0,0]
		}, 
        {
          'label': 'Feature 10',
          'values': [26, 40, 45, 23, 10,0]
        }, 
        {
          'label': 'Feature 11',
          'values': [12, 0, 0, 0, 0,0]
        }],
        'color': ['#333','#FF0000','#666','#00FF00','#999','#0000FF']
        
    },
    {
        'label': ['Analysis', 'Awaiting Dev', 'Dev', 'Awaiting Testing', 'Testing', 'Awaiting Release'],
        'values': [
        {
          'label': 'Feature 1',
          'values': [40, 20, 15, 5, 5, 50]
        }, 
        {
          'label': 'Feature 2',
          'values': [30, 10, 45, 10, 10, 55]
        }, 
        {
          'label': 'Feature 3',
          'values': [38, 20, 35, 17, 10, 70]
        }, 
        {
          'label': 'Feature 4',
          'values': [58, 10, 35, 32, 10, 55]
        }, 
        {
          'label': 'Feature 5',
          'values': [55, 60, 34, 38, 5, 25]
        },   
        {
          'label': 'Feature 6',
          'values': [5, 15, 25, 14, 5, 50]
        }, 
        {
          'label': 'Feature 7',
          'values': [42, 30, 54, 35, 10, 75]
        }, 
        {
          'label': 'Feature 8',
          'values': [25, 35, 24, 30, 15, 85]
        },
        {
          'label': 'Feature 9',
          'values': [26, 40, 45, 34,10,45]
		}, 
        {
          'label': 'Feature 10',
          'values': [26, 40, 45, 23, 10,70]
        }, 
        {
          'label': 'Feature 11',
          'values': [12, 20, 0, 0, 0,0]
        }],
        'color': ['#333','#FF0000','#666','#00FF00','#999','#0000FF']
        
    }];
    //end
    var currentDataset = 0;
    var infovis = document.getElementById('infovis');
    //init AreaChart
    var areaChart = new $jit.AreaChart({
      //id of the visualization container
      injectInto: 'infovis',
      //add animations
      animate: true,
      //separation offsets
      Margin: {
        top: 5,
        left: 5,
        right: 5,
        bottom: 5
      },
      labelOffset: 10,
      //whether to display sums
      showAggregates: true,
      //whether to display labels at all
      showLabels: true,
      //could also be 'stacked'
      type: useGradients? 'stacked:gradient' : 'stacked',
      //label styling
      Label: {
        type: labelType, //can be 'Native' or 'HTML'
        size: 13,
        family: 'Arial',
        color: 'white'
      },
      //enable tips
      Tips: {
        enable: true,
        onShow: function(tip, elem) {
          tip.innerHTML = "<b>" + elem.name + "</b>: " + elem.value;
        }
      },
      //add left and right click handlers
      filterOnClick: true,
      restoreOnRightClick:true
    });
    //load JSON data.
    areaChart.loadJSON(json[currentDataset]);
    //end
    var list = $jit.id('id-list'),
        button = $jit.id('update'),
        restoreButton = $jit.id('restore');
    //update json on click
    $jit.util.addEvent(button, 'click', function() {
      var util = $jit.util;
      currentDataset =(currentDataset+1)%json.length;
      areaChart.updateJSON(json[currentDataset]);
    });
    //restore graph on click
    $jit.util.addEvent(restoreButton, 'click', function() {
      areaChart.restore();
    });
    //dynamically add legend to list
    var legend = areaChart.getLegend(),
        listItems = [];
    for(var name in legend) {
      listItems.push('<div class=\'query-color\' style=\'background-color:'
          + legend[name] +'\'>&nbsp;</div>' + name);
    }
    list.innerHTML = '<li>' + listItems.join('</li><li>') + '</li>';
}