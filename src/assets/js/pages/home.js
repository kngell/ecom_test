import owlCarousel from "owl.carousel";
const responsive = {
  0: {
    items: 1,
  },
  600: {
    items: 3,
  },
  1000: {
    items: 5,
  },
};
document.addEventListener("DOMContentLoaded", function () {
  function PhpPlugin(element) {
    this.element = element;
    this.init();
  }
  PhpPlugin.prototype.init = function () {
    this.setupVariables();
    this.setupEvents();
  };
  PhpPlugin.prototype.setupVariables = function () {
    this.banner = this.element.find("#banner-area");
    this.topSale = this.element.find("#top-sale");
  };
  PhpPlugin.prototype.setupEvents = function () {
    var phpPlugin = this;

    //=======================================================================
    //Owl carouse
    //=======================================================================

    //Banner
    phpPlugin.banner.find(".owl-carousel").owlCarousel({
      dots: true,
      items: 1,
      autoplay: true,
    });

    //Top sales
    phpPlugin.topSale.find(".owl-carousel").owlCarousel({
      loop: true,
      nav: true,
      dots: false,
      responsive: responsive,
    });
  };

  $.fn.phpPlugin = function (options) {
    new PhpPlugin(this);
    return this;
  };
  $("#main-site").phpPlugin();
});
