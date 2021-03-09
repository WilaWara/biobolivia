window.console = window.console || function(t) {};

if (document.location.search.match(/type=embed/gi)) {
    window.parent.postMessage("resize", "*");
}

// SMOOTH SCROLLING SECTIONS
/*$('a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') 
        || location.hostname == this.hostname) {

        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
           if (target.length) {
             $('html,body').animate({
                 scrollTop: target.offset().top
            }, 1000);
            return false;
        }
    }
});*/

function cargar_proyectos(){
    try{
        $.ajax({
            type: 'GET',
            url: 'includes/cargar_proyectos.php',
            timeout: 5000,
            success: function(respuesta) {
                let proyectos = JSON.parse(respuesta);
                let longitud = Object.keys(proyectos).length;
                var outerHTML1 = "";
                let outerHTML2 = "";

                let nombre_proyecto = "";
                let resena_nombre_proyecto = "";
                let fecha_inicio = "";
                let fecha_fin = "";
                let orden = "";
                let resultados = "";
                let nombre_tematica = "";

                let periodo = "";

                for(i = 0; i < longitud - 1; i+=6){
                    nombre_proyecto = proyectos[i];
                    if(nombre_proyecto.length >= 12){
                        resena_nombre_proyecto = nombre_proyecto.substring(0,12) + "...";
                    }else{
                        resena_nombre_proyecto = nombre_proyecto;
                    }
                    fecha_inicio = proyectos[i + 1];
                    fecha_fin = proyectos[i + 2];
                    orden = proyectos[i + 3];
                    resultados = proyectos[i + 4];
                    nombre_tematica = proyectos[i + 5];

                    if(fecha_fin === null){
                        periodo = fecha_inicio.substring(0,4);
                    }else{
                        periodo = fecha_inicio.substring(0,4) + ' al ' + fecha_fin.substring(0,4);
                    }

                    if(i == 0){
                        outerHTML1 += '\n\
                        <li role="presentation" class="active">\n\
                            <a href="#section' + (i + 1) + '">\n\
                                <span class="nav__counter"><strong>' + periodo + ':</strong> ' + resena_nombre_proyecto + '</span>\n\
                                <h3 class="nav__title"></h3>\n\
                                <p class="nav__body"><strong></strong></p>\n\
                            </a>\n\
                        </li>';  
                    }else{
                        outerHTML1 += '\n\
                        <li role="presentation">\n\
                            <a href="#section' + (i + 1) + '">\n\
                                <span class="nav__counter"><strong>' + periodo + ':</strong> ' + resena_nombre_proyecto + '</span>\n\
                                <h3 class="nav__title"></h3>\n\
                                <p class="nav__body"><strong></strong></p>\n\
                            </a>\n\
                        </li>';  
                    }

                    outerHTML2 += '\n\
                    <section class="section section' + (i + 1) + '" id="section' + (i + 1) + '"><div class="texto_resultado"><strong>' + nombre_proyecto + '<br>Tem&aacute;tica: ' + nombre_tematica + '</strong><br>' + resultados + '</div></section>';                                                                 
                }

                document.getElementById("contenedor_presentaciones").innerHTML = outerHTML1;
                document.getElementById("contenedor_general").innerHTML += outerHTML2;
            },

            error: function(XMLHttpRequest, textStatus, errorThrown) {
                alert("Error A al cargar los proyectos: " + errorThrown.message);
            }
        });
    }catch(err){
        alert("Error B al cargar los proyectos: " + err.message);
    }
}

function filtrar_tematica(){
    let tematica = document.getElementById("filtro_tematicas").value;
    $.ajax({
        type: 'POST',
        url: 'includes/buscar_tematica.php',
        timeout: 5000,
        data:{
            tematica:tematica
        },
        success: function(respuesta) {
            document.getElementById("contenedor_general").innerHTML = '<nav class="nav__wrapper" id="navbar-example"><ul class="nav" id="contenedor_presentaciones"></ul></nav>';
            document.getElementById("contenedor_presentaciones").innerHTML = "";

            let proyectos = JSON.parse(respuesta);
            let longitud = Object.keys(proyectos).length;
            var outerHTML1 = "";
            let outerHTML2 = "";

            let nombre_proyecto = "";
            let resena_nombre_proyecto = "";
            let fecha_inicio = "";
            let fecha_fin = "";
            let orden = "";
            let resultados = "";
            let nombre_tematica = "";

            let periodo = "";

            for(i = 0; i < longitud - 1; i+=6){
                nombre_proyecto = proyectos[i];
                if(nombre_proyecto.length >= 12){
                    resena_nombre_proyecto = nombre_proyecto.substring(0,12) + "...";
                }else{
                    resena_nombre_proyecto = nombre_proyecto;
                }
                fecha_inicio = proyectos[i + 1];
                fecha_fin = proyectos[i + 2];
                orden = proyectos[i + 3];
                resultados = proyectos[i + 4];
                nombre_tematica = proyectos[i + 5];

                if(fecha_fin === null){
                    periodo = fecha_inicio.substring(0,4);
                }else{
                    periodo = fecha_inicio.substring(0,4) + ' al ' + fecha_fin.substring(0,4);
                }

                if(i == 0){
                    outerHTML1 += '\n\
                    <li role="presentation" class="active">\n\
                        <a href="#section' + (i + 1) + '">\n\
                            <span class="nav__counter"><strong>' + periodo + ':</strong> ' + resena_nombre_proyecto + '</span>\n\
                            <h3 class="nav__title"></h3>\n\
                            <p class="nav__body"><strong></strong></p>\n\
                        </a>\n\
                    </li>';  
                }else{
                    outerHTML1 += '\n\
                    <li role="presentation">\n\
                        <a href="#section' + (i + 1) + '">\n\
                            <span class="nav__counter"><strong>' + periodo + ':</strong> ' + resena_nombre_proyecto + '</span>\n\
                            <h3 class="nav__title"></h3>\n\
                            <p class="nav__body"><strong></strong></p>\n\
                        </a>\n\
                    </li>';  
                }

                outerHTML2 += '\n\
                <section class="section section' + (i + 1) + '" id="section' + (i + 1) + '"><div class="texto_resultado"><strong>' + nombre_proyecto + '<br>Tem&aacute;tica: ' + nombre_tematica + '</strong><br>' + resultados + '</div></section>';
            }

            document.getElementById("contenedor_presentaciones").innerHTML = outerHTML1;
            document.getElementById("contenedor_general").innerHTML += outerHTML2;
        },

        error: function(XMLHttpRequest, textStatus, errorThrown) {
            alert("Error A al cargar los proyectos: " + errorThrown.message);
        }
    });
}