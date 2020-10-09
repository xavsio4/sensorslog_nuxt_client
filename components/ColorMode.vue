  <template>
  <div>
   <!-- <h1>Color mode: {{ $colorMode.value }}</h1> -->
   <b-form-group label="Color Mode">
    <b-select  v-model="$colorMode.preference">
      <option value="system">System</option>
      <option value="light">Light</option>
      <option value="dark">Dark</option>
      <option value="sepia">Sepia</option>
    </b-select>
    </b-form-group>
  </div>
</template>

<style>

.dark-mode body {
  background-color: #091a28;
  color: #ebf4f1;
}
.sepia-mode body {
  background-color: #f1e7d0;
  color: #433422;
}
</style>