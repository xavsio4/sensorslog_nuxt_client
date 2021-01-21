<template>
  <b-container fluid>
    <h1>Documentation</h1>
    <p>
      Sensorslog.com is a free service that can store the values sent through a
      Rest Api Endpoint. The first and most important endpoint is the one that
      inserts data.
    </p>
     <br/>
  <hr/>
  <br/>
    <h2>1. Log Data into Sensorslog</h2>
    <p>
      <code-display
        :code="
          'https://api.sensorslog.com/api/v1/measure/create?measure_type=Temp&measure_value=19' +
          '\n\n' +
          '&measure_unit=C°' +
          '&origin=mkr1000&key=YourApiKey'
        "
        caption="Endpoint to post a measure from your iot device"
      >
      </code-display>
    </p>
    <p>It needs several parameters (order is not important):</p>
    <ul>
      <li><strong>origin:</strong> A string telling from where/what the measure it taken. Example:Clervaux,L </li>
      <li><strong>Measure Type:</strong> A string to show the type of measure. Example: temperature, wind speed, humidity, etc... Whatever helps you identify the measure.</li>
      <li><strong>Measure Value:</strong>The value itself, it should be a float or integer.<span class="text-danger">*</span></li>
      <li><strong>Measure Unit:</strong> A string representing the value's unit. For example, if it is a temperature then it might be 'C°'</li>
    </ul>
    <b-alert show>Use the "POST" verb to use this endpoint. Only <span class="text-danger">*</span> marked parameters are mandatory. The measure_value and your api key are mandatory.

    You will obtain your api key from the account page after registration.</b-alert>
  <br/>
  <hr/>
  <br/>
    <h2>2. Get Data from Sensorslog</h2>
    The data you log into the service can be retrieved in 2 ways.

    <h4>2.1. Download your data into csv</h4>
    The first way is by clicking the download data button into your dashboard. You will get your data in csv format.

    <h4>2.2. Use the "select" endpoint</h4>

    <code-display
        :code="
          'https://api.sensorslog.com/api/v1/measure/get?measure_type=Temp&measure_value=19' +
          '\n\n' +
          '&measure_unit=C°' +
          '&origin=mkr1000&key=YourApiKey'
        "
        caption="Endpoint to get a measure from your iot device"
      >
      </code-display>

      <p>What you will retieve depends on the arguments you pass. All arguments, but your api key, are optional.</p>

      If your endpoint goes like this
      <code-display
        :code="
          'https://api.sensorslog.com/api/v1/measure/get?measure_type=Temp&key=YourApiKey'
        "
        caption="Endpoint to get all measures with a measure_type equal to 'Temps' from your iot device"
      >
      </code-display>

      <p>Any parameter passed will filter the result. Here goes another example:</p>
      <code-display
        :code="
          'https://api.sensorslog.com/api/v1/measure/get?measure_type=temp&origin=charleroi&key=YourApiKey'
        "
        caption="Endpoint to get all measures with a measure_type equal to 'temp' and an origin equal to 'charleroi' from your iot device"
      >
      </code-display>
      <b-alert variant="warning" show>The result is always paginated. You will have to use "&page=2" to get the second page of results.</b-alert>
      <p>This is the expected result (JSON format)</p>
      <pre>
        {
    "data": [
        {
            "id": 23,
            "measure_value": 16,
            "measure_type": "temp",
            "measure_unit": null,
            "created_at": "2021-01-21 14:43:26",
            "origin": "charleroi"
        }
    ],
    "links": {
        "first": "https://api.sensorslog.com/v1/measure/get?page=1",
        "last": "https://api.sensorslog.com/v1/measure/get?page=1",
        "prev": null,
        "next": null
    },
    "meta": {
        "current_page": 1,
        "from": 1,
        "last_page": 1,
        "links": [
            {
                "url": null,
                "label": "Previous",
                "active": false
            },
            {
                "url": "https://api.sensorslog.com/v1/measure/get?page=1",
                "label": 1,
                "active": true
            },
            {
                "url": null,
                "label": "Next",
                "active": false
            }
        ],
        "path": "https://api.sensorslog.com/v1/measure/get",
        "per_page": 15,
        "to": 1,
        "total": 1
    }
}
      </pre>
  </b-container>
</template>
<script>
import CodeDisplay from '@/components/CodeDisplay'
//import CodeDisplay from '../components/CodeDisplay.vue'

export default {
  auth: 'guest',
  components: {
    CodeDisplay,
  },
}
</script>
<style>
.docSample {
    padding: 15px;
    background-color: #e8f4ff;
    margin: 1em 0;
}

pre {
  padding:12px;
  background-color:#333;
  color:#ddd;
}
</style>