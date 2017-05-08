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
      };var element = document.getElementById("f2303a36-e9e0-403e-9fbf-0e9a8932bcc1");
      if (element == null) {
        console.log("Bokeh: ERROR: autoload.js configured with elementid 'f2303a36-e9e0-403e-9fbf-0e9a8932bcc1' but no matching script tag was found. ")
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
                var docs_json = {"4578e9c8-8ec9-4f0a-aa3a-ea36b65fa2d7":{"roots":{"references":[{"attributes":{"overlay":{"id":"53a358e8-1991-48d2-bbab-e401b8f21ffe","type":"BoxAnnotation"},"plot":{"id":"5756cac8-8646-4575-a953-fa73b11bbe8b","subtype":"Chart","type":"Plot"}},"id":"ca268888-0fb6-4875-bc0f-4744c2bac13c","type":"BoxZoomTool"},{"attributes":{},"id":"edbe1723-e2c3-4ffc-b62a-b425812d6870","type":"BasicTicker"},{"attributes":{"callback":null,"end":1.6500000000000001,"start":-1.6500000000000001},"id":"892ef5bd-1a2a-4006-be7c-74249bfb854b","type":"Range1d"},{"attributes":{"angle":{"field":"text_angle","units":"rad"},"text_align":"center","text_baseline":"middle","text_font_size":{"value":"10px"},"x":{"field":"x"},"y":{"field":"y"}},"id":"79966e00-e401-4dce-bd4f-c96e12fe3fdf","type":"Text"},{"attributes":{"plot":{"id":"5756cac8-8646-4575-a953-fa73b11bbe8b","subtype":"Chart","type":"Plot"}},"id":"69f21e64-7956-4f1c-9f30-bcec584005ae","type":"SaveTool"},{"attributes":{},"id":"620df5e0-6d13-4d59-a8c5-868c3a4b1a32","type":"ToolEvents"},{"attributes":{"callback":null,"column_names":["text_angle","x","y","text"],"data":{"text":["Development Lead","Project Lead","Support","Test Lead","Test Manager"],"text_angle":{"__ndarray__":"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA==","dtype":"float64","shape":[5]},"x":[1.088115509920111,-0.21709597051710308,-1.0081698315427634,-0.518213020159038,0.6068260186041189],"y":[0.28570900768316193,1.103854310851408,-0.4992179792105206,-0.998539065704316,-0.9473052217448574]}},"id":"1fa85fd9-3da5-4420-b9ec-35abecb21a60","type":"ColumnDataSource"},{"attributes":{"plot":{"id":"5756cac8-8646-4575-a953-fa73b11bbe8b","subtype":"Chart","type":"Plot"}},"id":"34b0abb7-74fe-40c9-b398-924b952b0eb3","type":"ResetTool"},{"attributes":{"background_fill_alpha":{"value":0},"below":[{"id":"6b33b229-d114-4135-be23-29bad847d37a","type":"LinearAxis"}],"border_fill_color":{"value":null},"css_classes":null,"left":[{"id":"4352280b-e6f6-446a-bfe0-6517b9fea7d3","type":"LinearAxis"}],"outline_line_color":{"value":null},"plot_height":250,"plot_width":250,"renderers":[{"id":"53a358e8-1991-48d2-bbab-e401b8f21ffe","type":"BoxAnnotation"},{"id":"45f9d002-9aeb-4fbd-9503-8de1bbeb4c77","type":"GlyphRenderer"},{"id":"0b0dbfc1-81de-4e51-b7c6-c3aeaf75659e","type":"GlyphRenderer"},{"id":"43e481f0-3e00-4d79-bd3f-0df5a118f31f","type":"Legend"},{"id":"6b33b229-d114-4135-be23-29bad847d37a","type":"LinearAxis"},{"id":"4352280b-e6f6-446a-bfe0-6517b9fea7d3","type":"LinearAxis"}],"sizing_mode":"scale_width","title":{"id":"c712440e-ba41-4fca-ae73-d8bfeab89e33","type":"Title"},"tool_events":{"id":"620df5e0-6d13-4d59-a8c5-868c3a4b1a32","type":"ToolEvents"},"toolbar":{"id":"b9755785-e874-418a-9819-6c73f0d07f03","type":"Toolbar"},"toolbar_location":null,"x_mapper_type":"auto","x_range":{"id":"892ef5bd-1a2a-4006-be7c-74249bfb854b","type":"Range1d"},"y_mapper_type":"auto","y_range":{"id":"535780b9-94b7-4828-8a9c-9940561e0f3b","type":"Range1d"}},"id":"5756cac8-8646-4575-a953-fa73b11bbe8b","subtype":"Chart","type":"Plot"},{"attributes":{"axis_label":null,"formatter":{"id":"3d792639-e825-4312-825b-17ab0e965d2f","type":"BasicTickFormatter"},"plot":{"id":"5756cac8-8646-4575-a953-fa73b11bbe8b","subtype":"Chart","type":"Plot"},"ticker":{"id":"6bace439-46d0-4078-91b2-67faca135cd6","type":"BasicTicker"},"visible":false},"id":"6b33b229-d114-4135-be23-29bad847d37a","type":"LinearAxis"},{"attributes":{"end_angle":{"field":"end","units":"rad"},"fill_alpha":{"value":0.8},"fill_color":{"field":"color"},"inner_radius":{"field":"inners","units":"data"},"line_color":{"value":"White"},"outer_radius":{"field":"outers","units":"data"},"start_angle":{"field":"start","units":"rad"},"x":{"value":0},"y":{"value":0}},"id":"3544c9fd-5615-4212-bb1b-9b0e814fbf50","type":"AnnularWedge"},{"attributes":{},"id":"3d792639-e825-4312-825b-17ab0e965d2f","type":"BasicTickFormatter"},{"attributes":{"callback":null,"end":1.6500000000000001,"start":-1.6500000000000001},"id":"535780b9-94b7-4828-8a9c-9940561e0f3b","type":"Range1d"},{"attributes":{"plot":{"id":"5756cac8-8646-4575-a953-fa73b11bbe8b","subtype":"Chart","type":"Plot"}},"id":"95c740e2-386e-4063-b9db-b945b0827def","type":"WheelZoomTool"},{"attributes":{"location":"top_left","plot":{"id":"5756cac8-8646-4575-a953-fa73b11bbe8b","subtype":"Chart","type":"Plot"}},"id":"43e481f0-3e00-4d79-bd3f-0df5a118f31f","type":"Legend"},{"attributes":{"plot":{"id":"5756cac8-8646-4575-a953-fa73b11bbe8b","subtype":"Chart","type":"Plot"}},"id":"a2367f18-1ebb-4b79-83a0-fb06748e0f30","type":"HelpTool"},{"attributes":{"data_source":{"id":"ac3e7f8d-261c-4284-aefc-4d9b5664d57f","type":"ColumnDataSource"},"glyph":{"id":"3544c9fd-5615-4212-bb1b-9b0e814fbf50","type":"AnnularWedge"},"hover_glyph":null,"nonselection_glyph":null,"selection_glyph":null},"id":"45f9d002-9aeb-4fbd-9503-8de1bbeb4c77","type":"GlyphRenderer"},{"attributes":{"data_source":{"id":"1fa85fd9-3da5-4420-b9ec-35abecb21a60","type":"ColumnDataSource"},"glyph":{"id":"79966e00-e401-4dce-bd4f-c96e12fe3fdf","type":"Text"},"hover_glyph":null,"nonselection_glyph":null,"selection_glyph":null},"id":"0b0dbfc1-81de-4e51-b7c6-c3aeaf75659e","type":"GlyphRenderer"},{"attributes":{},"id":"6bace439-46d0-4078-91b2-67faca135cd6","type":"BasicTicker"},{"attributes":{"active_drag":"auto","active_scroll":"auto","active_tap":"auto","tools":[{"id":"fa440b4e-1d37-4d8e-ab25-20b5cb9b159c","type":"PanTool"},{"id":"95c740e2-386e-4063-b9db-b945b0827def","type":"WheelZoomTool"},{"id":"ca268888-0fb6-4875-bc0f-4744c2bac13c","type":"BoxZoomTool"},{"id":"69f21e64-7956-4f1c-9f30-bcec584005ae","type":"SaveTool"},{"id":"34b0abb7-74fe-40c9-b398-924b952b0eb3","type":"ResetTool"},{"id":"a2367f18-1ebb-4b79-83a0-fb06748e0f30","type":"HelpTool"}]},"id":"b9755785-e874-418a-9819-6c73f0d07f03","type":"Toolbar"},{"attributes":{"plot":{"id":"5756cac8-8646-4575-a953-fa73b11bbe8b","subtype":"Chart","type":"Plot"}},"id":"fa440b4e-1d37-4d8e-ab25-20b5cb9b159c","type":"PanTool"},{"attributes":{"axis_label":null,"formatter":{"id":"7c9a872d-077e-4405-b293-b614242919d8","type":"BasicTickFormatter"},"plot":{"id":"5756cac8-8646-4575-a953-fa73b11bbe8b","subtype":"Chart","type":"Plot"},"ticker":{"id":"edbe1723-e2c3-4ffc-b62a-b425812d6870","type":"BasicTicker"},"visible":false},"id":"4352280b-e6f6-446a-bfe0-6517b9fea7d3","type":"LinearAxis"},{"attributes":{"align":"center","plot":null,"text":"Top 5 Role","text_font_size":{"value":"12px"}},"id":"c712440e-ba41-4fca-ae73-d8bfeab89e33","type":"Title"},{"attributes":{"bottom_units":"screen","fill_alpha":{"value":0.5},"fill_color":{"value":"lightgrey"},"left_units":"screen","level":"overlay","line_alpha":{"value":1.0},"line_color":{"value":"black"},"line_dash":[4,4],"line_width":{"value":2},"plot":null,"render_mode":"css","right_units":"screen","top_units":"screen"},"id":"53a358e8-1991-48d2-bbab-e401b8f21ffe","type":"BoxAnnotation"},{"attributes":{"callback":null,"column_names":["color","start","values","outers","end","centers","level","inners","role"],"data":{"centers":[1.125,1.125,1.125,1.125,1.125],"color":["#f5eef6","#eae6f1","#dbdaeb","#cacee5","#b4c4df"],"end":[0.5135519637185889,3.0164255270776805,4.186316098085958,4.281043603325263,6.283185307179586],"inners":[0.0,0.0,0.0,0.0,0.0],"level":[0.0,0.0,0.0,0.0,0.0],"outers":[1.5,1.5,1.5,1.5,1.5],"role":["Development Lead","Project Lead","Support","Test Lead","Test Manager"],"start":[0.0,0.5135519637185889,3.0164255270776805,4.186316098085958,4.281043603325263],"values":[0.1856630339132202,0.9048570195499789,0.4229473317307542,0.03424657534246575,0.7238288027761709]}},"id":"ac3e7f8d-261c-4284-aefc-4d9b5664d57f","type":"ColumnDataSource"},{"attributes":{},"id":"7c9a872d-077e-4405-b293-b614242919d8","type":"BasicTickFormatter"}],"root_ids":["5756cac8-8646-4575-a953-fa73b11bbe8b"]},"title":"Bokeh Application","version":"0.12.4"}};
                var render_items = [{"docid":"4578e9c8-8ec9-4f0a-aa3a-ea36b65fa2d7","elementid":"f2303a36-e9e0-403e-9fbf-0e9a8932bcc1","modelid":"5756cac8-8646-4575-a953-fa73b11bbe8b"}];
                
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
