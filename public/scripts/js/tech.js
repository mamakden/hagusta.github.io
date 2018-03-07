(function() {
  var fn = function() {
    
    (function(global) {
      function now() {
        return new Date();
      }
    
      var force = false;
    
      if (typeof (window._bokeh_onload_callbacks) === "undefined" || force === true) {
        window._bokeh_onload_callbacks = [];
        window._bokeh_is_loading = undefined;
      }
    
    
      
      
    
      function run_callbacks() {
        window._bokeh_onload_callbacks.forEach(function(callback) { callback() });
        delete window._bokeh_onload_callbacks
        console.info("Bokeh: all callbacks have finished");
      }
    
      function load_libs(js_urls, callback) {
        window._bokeh_onload_callbacks.push(callback);
        if (window._bokeh_is_loading > 0) {
          console.log("Bokeh: BokehJS is being loaded, scheduling callback at", now());
          return null;
        }
        if (js_urls == null || js_urls.length === 0) {
          run_callbacks();
          return null;
        }
        console.log("Bokeh: BokehJS not loaded, scheduling load and callback at", now());
        window._bokeh_is_loading = js_urls.length;
        for (var i = 0; i < js_urls.length; i++) {
          var url = js_urls[i];
          var s = document.createElement('script');
          s.src = url;
          s.async = false;
          s.onreadystatechange = s.onload = function() {
            window._bokeh_is_loading--;
            if (window._bokeh_is_loading === 0) {
              console.log("Bokeh: all BokehJS libraries loaded");
              run_callbacks()
            }
          };
          s.onerror = function() {
            console.warn("failed to load library " + url);
          };
          console.log("Bokeh: injecting script tag for BokehJS library: ", url);
          document.getElementsByTagName("head")[0].appendChild(s);
        }
      };var element = document.getElementById("e67d5be9-7faa-40b9-a2fc-f2dac5ec2ec5");
      if (element == null) {
        console.log("Bokeh: ERROR: autoload.js configured with elementid 'e67d5be9-7faa-40b9-a2fc-f2dac5ec2ec5' but no matching script tag was found. ")
        return false;
      }
    
      var js_urls = ["https://cdn.pydata.org/bokeh/release/bokeh-0.12.4.min.js", "https://cdn.pydata.org/bokeh/release/bokeh-widgets-0.12.4.min.js"];
    
      var inline_js = [
        function(Bokeh) {
          Bokeh.set_log_level("info");
        },
        
        function(Bokeh) {
          (function() {
            var fn = function() {
              Bokeh.safely(function() {
                var docs_json = {"b3258c5c-bda5-4378-bcae-f91ba34eb446":{"roots":{"references":[{"attributes":{"active_drag":"auto","active_scroll":"auto","active_tap":"auto","tools":[{"id":"9584f0a1-8b9b-4828-8edf-a18eec66f2b9","type":"PanTool"},{"id":"53acb474-ca0e-4c81-92b5-b6d99cb4b4f3","type":"WheelZoomTool"},{"id":"52bf81e9-418d-4687-891d-f43d743d2384","type":"BoxZoomTool"},{"id":"8c4b8d32-9ad2-4227-a830-12a08b48e9ba","type":"SaveTool"},{"id":"65c8917b-fa8d-4a03-ab8f-54850d558a5f","type":"ResetTool"},{"id":"c1e5fbca-020d-41e4-878b-5844d4c5d6d8","type":"HelpTool"}]},"id":"a4121139-1232-4531-b186-4f843dad3d9d","type":"Toolbar"},{"attributes":{},"id":"dca0567c-80d9-4bff-b422-7537dbbc4b3c","type":"BasicTickFormatter"},{"attributes":{},"id":"0c1e18d5-3b6f-4fc2-a24c-ded83cd36b9a","type":"BasicTickFormatter"},{"attributes":{},"id":"b3d185e3-e597-4e29-9b40-391db72f43d4","type":"BasicTicker"},{"attributes":{"axis_label":null,"formatter":{"id":"0c1e18d5-3b6f-4fc2-a24c-ded83cd36b9a","type":"BasicTickFormatter"},"plot":{"id":"de32a3d3-ac67-46e9-b4d4-01168a1c3a5f","subtype":"Chart","type":"Plot"},"ticker":{"id":"5e8041d7-e8ca-43c9-9065-3333a4ca6151","type":"BasicTicker"},"visible":false},"id":"ce95291a-125d-4eab-83ec-bce273a16905","type":"LinearAxis"},{"attributes":{"location":"top_left","plot":{"id":"de32a3d3-ac67-46e9-b4d4-01168a1c3a5f","subtype":"Chart","type":"Plot"}},"id":"e3f5d00e-d8c4-46b1-847e-46660903643e","type":"Legend"},{"attributes":{"angle":{"field":"text_angle","units":"rad"},"text_align":"center","text_baseline":"middle","text_font_size":{"value":"10px"},"x":{"field":"x"},"y":{"field":"y"}},"id":"8c0f6f4c-668d-439a-bcec-b45e4b792f6e","type":"Text"},{"attributes":{"overlay":{"id":"38b1b10e-19b7-4e0b-a26b-132ef5a084ed","type":"BoxAnnotation"},"plot":{"id":"de32a3d3-ac67-46e9-b4d4-01168a1c3a5f","subtype":"Chart","type":"Plot"}},"id":"52bf81e9-418d-4687-891d-f43d743d2384","type":"BoxZoomTool"},{"attributes":{"plot":{"id":"de32a3d3-ac67-46e9-b4d4-01168a1c3a5f","subtype":"Chart","type":"Plot"}},"id":"53acb474-ca0e-4c81-92b5-b6d99cb4b4f3","type":"WheelZoomTool"},{"attributes":{"axis_label":null,"formatter":{"id":"dca0567c-80d9-4bff-b422-7537dbbc4b3c","type":"BasicTickFormatter"},"plot":{"id":"de32a3d3-ac67-46e9-b4d4-01168a1c3a5f","subtype":"Chart","type":"Plot"},"ticker":{"id":"b3d185e3-e597-4e29-9b40-391db72f43d4","type":"BasicTicker"},"visible":false},"id":"e7b40128-9ed2-4d6a-ad50-8080a162e236","type":"LinearAxis"},{"attributes":{"callback":null,"column_names":["color","start","values","outers","end","centers","level","inners","tech"],"data":{"centers":[1.125,1.125,1.125,1.125,1.125],"color":["#f5eef6","#eae6f1","#dbdaeb","#cacee5","#b4c4df"],"end":[2.6101979062091716,4.286099156377629,4.6981923458167625,5.878732564811962,6.283185307179588],"inners":[0.0,0.0,0.0,0.0,0.0],"level":[0.0,0.0,0.0,0.0,0.0],"outers":[1.5,1.5,1.5,1.5,1.5],"start":[0.0,2.6101979062091716,4.286099156377629,4.6981923458167625,5.878732564811962],"tech":["Ab-Initio","Cisco CC","Genesys CC","Oracle","Virtual Basic "],"values":[0.9048570195499789,0.5809716599190281,0.14285714285714285,0.4092487015937679,0.14020848845867467]}},"id":"a5e7beb8-80cd-4051-8d96-f9ab96c768d8","type":"ColumnDataSource"},{"attributes":{},"id":"5e8041d7-e8ca-43c9-9065-3333a4ca6151","type":"BasicTicker"},{"attributes":{"plot":{"id":"de32a3d3-ac67-46e9-b4d4-01168a1c3a5f","subtype":"Chart","type":"Plot"}},"id":"c1e5fbca-020d-41e4-878b-5844d4c5d6d8","type":"HelpTool"},{"attributes":{"callback":null,"column_names":["text_angle","x","y","text"],"data":{"text":["Ab-Initio","Cisco CC","Genesys CC","Oracle","Virtual Basic "],"text_angle":{"__ndarray__":"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA==","dtype":"float64","shape":[5]},"x":[0.29540501384245865,-1.072550901133706,-0.24577535639757545,0.6128272451980095,1.1020745672689691],"y":[1.0855233197848568,-0.33949899039213,-1.0978248832066273,-0.9434340292479485,-0.22595718218041738]}},"id":"b0064a16-74ed-4945-9d42-d60b31caf355","type":"ColumnDataSource"},{"attributes":{"plot":{"id":"de32a3d3-ac67-46e9-b4d4-01168a1c3a5f","subtype":"Chart","type":"Plot"}},"id":"65c8917b-fa8d-4a03-ab8f-54850d558a5f","type":"ResetTool"},{"attributes":{"plot":{"id":"de32a3d3-ac67-46e9-b4d4-01168a1c3a5f","subtype":"Chart","type":"Plot"}},"id":"9584f0a1-8b9b-4828-8edf-a18eec66f2b9","type":"PanTool"},{"attributes":{"callback":null,"end":1.6500000000000001,"start":-1.6500000000000001},"id":"c427bb6f-1567-4fbb-b66c-f37ddaba5989","type":"Range1d"},{"attributes":{"callback":null,"end":1.6500000000000001,"start":-1.6500000000000001},"id":"b8ce77f6-e510-455f-be64-0ab68d4adbe9","type":"Range1d"},{"attributes":{"bottom_units":"screen","fill_alpha":{"value":0.5},"fill_color":{"value":"lightgrey"},"left_units":"screen","level":"overlay","line_alpha":{"value":1.0},"line_color":{"value":"black"},"line_dash":[4,4],"line_width":{"value":2},"plot":null,"render_mode":"css","right_units":"screen","top_units":"screen"},"id":"38b1b10e-19b7-4e0b-a26b-132ef5a084ed","type":"BoxAnnotation"},{"attributes":{"data_source":{"id":"b0064a16-74ed-4945-9d42-d60b31caf355","type":"ColumnDataSource"},"glyph":{"id":"8c0f6f4c-668d-439a-bcec-b45e4b792f6e","type":"Text"},"hover_glyph":null,"nonselection_glyph":null,"selection_glyph":null},"id":"e0a0b715-f7f1-4cac-8c51-9fbf2574a97a","type":"GlyphRenderer"},{"attributes":{"data_source":{"id":"a5e7beb8-80cd-4051-8d96-f9ab96c768d8","type":"ColumnDataSource"},"glyph":{"id":"67430ddd-751e-40cc-a714-3965ea0e2ceb","type":"AnnularWedge"},"hover_glyph":null,"nonselection_glyph":null,"selection_glyph":null},"id":"4e5a2722-2c35-46cf-9a72-ad82dc733574","type":"GlyphRenderer"},{"attributes":{"align":"center","plot":null,"text":"Top 5 Technology","text_font_size":{"value":"12px"}},"id":"ef60d756-a819-4836-90dc-aa96804bd769","type":"Title"},{"attributes":{"end_angle":{"field":"end","units":"rad"},"fill_alpha":{"value":0.8},"fill_color":{"field":"color"},"inner_radius":{"field":"inners","units":"data"},"line_color":{"value":"White"},"outer_radius":{"field":"outers","units":"data"},"start_angle":{"field":"start","units":"rad"},"x":{"value":0},"y":{"value":0}},"id":"67430ddd-751e-40cc-a714-3965ea0e2ceb","type":"AnnularWedge"},{"attributes":{"plot":{"id":"de32a3d3-ac67-46e9-b4d4-01168a1c3a5f","subtype":"Chart","type":"Plot"}},"id":"8c4b8d32-9ad2-4227-a830-12a08b48e9ba","type":"SaveTool"},{"attributes":{"background_fill_alpha":{"value":0},"below":[{"id":"ce95291a-125d-4eab-83ec-bce273a16905","type":"LinearAxis"}],"border_fill_color":{"value":null},"css_classes":null,"left":[{"id":"e7b40128-9ed2-4d6a-ad50-8080a162e236","type":"LinearAxis"}],"outline_line_color":{"value":null},"plot_height":250,"plot_width":250,"renderers":[{"id":"38b1b10e-19b7-4e0b-a26b-132ef5a084ed","type":"BoxAnnotation"},{"id":"4e5a2722-2c35-46cf-9a72-ad82dc733574","type":"GlyphRenderer"},{"id":"e0a0b715-f7f1-4cac-8c51-9fbf2574a97a","type":"GlyphRenderer"},{"id":"e3f5d00e-d8c4-46b1-847e-46660903643e","type":"Legend"},{"id":"ce95291a-125d-4eab-83ec-bce273a16905","type":"LinearAxis"},{"id":"e7b40128-9ed2-4d6a-ad50-8080a162e236","type":"LinearAxis"}],"sizing_mode":"scale_width","title":{"id":"ef60d756-a819-4836-90dc-aa96804bd769","type":"Title"},"tool_events":{"id":"d81e4629-a46d-4c79-87ec-8bd69835481b","type":"ToolEvents"},"toolbar":{"id":"a4121139-1232-4531-b186-4f843dad3d9d","type":"Toolbar"},"toolbar_location":null,"x_mapper_type":"auto","x_range":{"id":"b8ce77f6-e510-455f-be64-0ab68d4adbe9","type":"Range1d"},"y_mapper_type":"auto","y_range":{"id":"c427bb6f-1567-4fbb-b66c-f37ddaba5989","type":"Range1d"}},"id":"de32a3d3-ac67-46e9-b4d4-01168a1c3a5f","subtype":"Chart","type":"Plot"},{"attributes":{},"id":"d81e4629-a46d-4c79-87ec-8bd69835481b","type":"ToolEvents"}],"root_ids":["de32a3d3-ac67-46e9-b4d4-01168a1c3a5f"]},"title":"Bokeh Application","version":"0.12.4"}};
                var render_items = [{"docid":"b3258c5c-bda5-4378-bcae-f91ba34eb446","elementid":"e67d5be9-7faa-40b9-a2fc-f2dac5ec2ec5","modelid":"de32a3d3-ac67-46e9-b4d4-01168a1c3a5f"}];
                
                Bokeh.embed.embed_items(docs_json, render_items);
              });
            };
            if (document.readyState != "loading") fn();
            else document.addEventListener("DOMContentLoaded", fn);
          })();
        },
        function(Bokeh) {
          console.log("Bokeh: injecting CSS: https://cdn.pydata.org/bokeh/release/bokeh-0.12.4.min.css");
          Bokeh.embed.inject_css("https://cdn.pydata.org/bokeh/release/bokeh-0.12.4.min.css");
          console.log("Bokeh: injecting CSS: https://cdn.pydata.org/bokeh/release/bokeh-widgets-0.12.4.min.css");
          Bokeh.embed.inject_css("https://cdn.pydata.org/bokeh/release/bokeh-widgets-0.12.4.min.css");
        }
      ];
    
      function run_inline_js() {
        
        for (var i = 0; i < inline_js.length; i++) {
          inline_js[i](window.Bokeh);
        }
        
      }
    
      if (window._bokeh_is_loading === 0) {
        console.log("Bokeh: BokehJS loaded, going straight to plotting");
        run_inline_js();
      } else {
        load_libs(js_urls, function() {
          console.log("Bokeh: BokehJS plotting callback run at", now());
          run_inline_js();
        });
      }
    }(this));
  };
  if (document.readyState != "loading") fn();
  else document.addEventListener("DOMContentLoaded", fn);
})();
