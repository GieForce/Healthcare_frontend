<template>
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Zonnevelt</title>
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="robots" content="all,follow">

  </head>
  <body>
  <div class="page">
    <!-- Counts Section -->
    <section class="dashboard-counts section-padding">
      <div class="container-fluid">
        <div class="row">
          <!-- Count item widget-->
          <div class="col-xl-2 col-md-4 col-6">
            <div class="wrapper count-title d-flex">
              <div class="icon"><i class="icon-user"></i></div>
              <div class="name"><strong class="text-uppercase">Werknemers</strong>
                <div class="count-number"></div>
              </div>
            </div>
          </div>
          <!-- Count item widget-->
          <div class="col-xl-2 col-md-4 col-6">
            <div class="wrapper count-title d-flex">
              <div class="icon"><i class="icon-padnote"></i></div>
              <div class="name"><strong class="text-uppercase">Opdrachten</strong>
                <div class="count-number"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- Header Section-->
    <section class="dashboard-header section-padding">
      <div class="container-fluid">
        <div class="row d-flex align-items-md-stretch">
          <!-- To Do List-->
          <div class="col-lg-3 col-md-6">
            <div class="card to-do">
              <h2 class="display h4">To do Lijst</h2>
              <ul class="check-lists list-unstyled">
                <li class="d-flex align-items-center">
                  <input type="checkbox" id="list-1" name="list-1" class="form-control-custom">
                  <label for="list-1">Similique sunt in culpa qui officia</label>
                </li>
                <li class="d-flex align-items-center">
                  <input type="checkbox" id="list-2" name="list-2" class="form-control-custom">
                  <label for="list-2">Ed ut perspiciatis unde omnis iste</label>
                </li>
                <li class="d-flex align-items-center">
                  <input type="checkbox" id="list-3" name="list-3" class="form-control-custom">
                  <label for="list-3">At vero eos et accusamus et iusto </label>
                </li>
                <li class="d-flex align-items-center">
                  <input type="checkbox" id="list-4" name="list-4" class="form-control-custom">
                  <label for="list-4">Explicabo Nemo ipsam voluptatem</label>
                </li>
                <li class="d-flex align-items-center">
                  <input type="checkbox" id="list-5" name="list-5" class="form-control-custom">
                  <label for="list-5">Similique sunt in culpa qui officia</label>
                </li>
                <li class="d-flex align-items-center">
                  <input type="checkbox" id="list-6" name="list-6" class="form-control-custom">
                  <label for="list-6">At vero eos et accusamus et iusto </label>
                </li>
                <li class="d-flex align-items-center">
                  <input type="checkbox" id="list-7" name="list-7" class="form-control-custom">
                  <label for="list-7">Similique sunt in culpa qui officia</label>
                </li>
                <li class="d-flex align-items-center">
                  <input type="checkbox" id="list-8" name="list-8" class="form-control-custom">
                  <label for="list-8">Ed ut perspiciatis unde omnis iste</label>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
    <footer class="main-footer">
      <div class="container-fluid">
        <div class="row">
          <div class="col-sm-6">
            <p>Jeroen&co &copy; 2018</p>
          </div>
        </div>
      </div>
    </footer>
  </div>
  </body>
  </html>

</template>

<script>
    export default {
        name: 'Home'
    }
</script>


