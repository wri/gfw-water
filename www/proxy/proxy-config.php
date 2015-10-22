<?xml version="1.0" encoding="utf-8" ?>
<ProxyConfig allowedReferers="*"
             mustMatch="true">
  <serverUrls>
    
    <serverUrl url="http://hydro.arcgis.com/arcgis/rest/services/Tools/Hydrology/GPServer" 
            matchAll="true"
            username="WATERSHED_USERNAME"
            password="WATERSHED_PASSWORD"
            />

    </serverUrls>
</ProxyConfig>

<!-- See https://github.com/Esri/resource-proxy for more information -->
