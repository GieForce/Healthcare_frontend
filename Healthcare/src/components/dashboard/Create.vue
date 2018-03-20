<template>
  <div class="page">
    <!-- Breadcrumb-->
    <div class="breadcrumb-holder">
      <div class="container-fluid">
        <ul class="breadcrumb">
          <li class="breadcrumb-item"><a href="index.html">Home</a></li>
          <li class="breadcrumb-item active">Forms       </li>
        </ul>
      </div>
    </div>
    <section class="forms">
      <div class="container-fluid">
        <!-- Page Header-->
        <header>
          <h1 class="h3 display">Creëren            </h1>
        </header>
        <h4>Gegevens</h4>
      </div>
      <div class="card-body">
        <form class="form-horizontal">
          <div class="form-group row">
            <label class="col-sm-2 form-control-label">Naam</label>
            <div class="col-sm-10">
              <input type="text" placeholder="Naam" class="form-control">
            </div>
          </div>
          <div class="line"></div>
          <div class="form-group row">
            <label class="col-sm-2 form-control-label">Achternaam</label>
            <div class="col-sm-10">
              <input type="text" placeholder="Achternaam" class="form-control">
            </div>
          </div>
          <div class="line"></div>
          <div class="form-group row">
            <label class="col-sm-2 form-control-label">E-Mail</label>
            <div class="col-sm-10">
              <input type="text" placeholder="E-Mail" class="form-control">
            </div>
          </div>
          <div class="line"></div>
          <div class="form-group row">
            <label class="col-sm-2 form-control-label">Gebruikersnaam</label>
            <div class="col-sm-10">
              <input type="password" placeholder="Gebruikersnaam" class="form-control">
            </div>
          </div>
          <div class="line"></div>
          <div class="form-group row">
            <label class="col-sm-2 form-control-label">Wachtwoord</label>
            <div class="col-sm-10">
              <input type="text" placeholder="Wachtwoord" class="form-control">
            </div>
          </div>
          <div class="line"></div>
          <div class="form-group row">
            <label class="col-sm-2 form-control-label">Beroep <br></label>
            <div class="col-sm-10">
              <div class="i-checks">
                <input id="radioCustom1" type="radio" checked="" value="option1" name="optionsRadios" class="form-control-custom radio-custom">
                <label for="radioCustom1">Huisarts</label>
              </div>
              <div class="i-checks">
                <input id="radioCustom2" type="radio" checked="" value="option2" name="optionsRadios" class="form-control-custom radio-custom">
                <label for="radioCustom2">Receptie Medewerker</label>
              </div>
              <div class="i-checks">
                <input id="radioCustom3" type="radio" checked="" value="option3" name="optionsRadios" class="form-control-custom radio-custom">
                <label for="radioCustom3">Apotheker</label>
              </div>
            </div>
          </div>
          <div class="line"></div>
          <div class="form-group row">
            <label class="col-sm-2 form-control-label">Geboortedatum</label>
            <div class="col-sm-10">
              <div class="row">
                <div class="col-md-2">
                  <input type="text" placeholder="Dag" class="form-control">
                </div>
                <div class="col-md-3">
                  <input type="text" placeholder="Maand" class="form-control">
                </div>
                <div class="col-md-4">
                  <input type="text" placeholder="Jaar" class="form-control">
                </div>
              </div>
            </div>
          </div>
          <div class="line"></div>
          <div class="form-group row">
            <label class="col-sm-2 form-control-label">Adres</label>
            <div class="col-sm-10">
              <div class="row">
                <div class="col-md-4">
                  <input type="text" placeholder="Straat" class="form-control">
                </div>
                <div class="col-md-3">
                  <input type="text" placeholder="Huisnummer" class="form-control">
                </div>
              </div>
            </div>
          </div>
          <div class="line"></div>
          <div class="form-group row">
            <div class="col-sm-4 offset-sm-2">
              <button type="submit" class="btn btn-secondary">Cancel</button>
              <button type="submit" class="btn btn-primary">Creëer</button>
            </div>
          </div>
        </form>
      </div>
    </section>
  </div>
</template>

<script>
    export default {
        name: "create"
    }
</script>

