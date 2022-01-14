// sintaxis del modo estricto para todo el script
'use strict';

export const propiedades_globales = {

    info_globals: {
        idiomas: {
            config: ['en', 'fr', 'es'],
            default: 'es'
        },
        
        monedas:{
            config: [{cod_mon:'VES',nom_mon:'Bolivar', simb_mon:'Bs.'},
                     {cod_mon:'EUR', nom_mon:'Euro', simb_mon:'€.'}, 
                     {cod_mon:'USD', nom_mon:'Dolar', simb_mon:'$.'}],
                     
            default: {cod_mon:'VES',nom_mon:'Bolivar', simb_mon:'Bs.'}
        },

        /*url imagenes globales*/
        name_system: 'sisgestore',
        pages_url_base_img: '../../assets/',
        default_img: 'default/user_default.png',
        url_logo_owner: 'logo_propietario/logo_c_super.png',
        /*url imagenes globales*/

        acciones_component: {
            all_action: ['edit', 'delete', 'view', 'create', 'list of'],
            all_url: ['/edit', '/delete', '/view', '/create', '/']
        },

        info_component: {
            owner: '',
            ruta_activada: '',
            title: '',
            id: '',
            accion_activa: '',
            list: {
                pagination: {
                    /*properties paginator globales*/
                    num_page: 0,
                    label_paginador_sig: 'next',
                    label_paginador_ant: 'previous',
                    label_paginador_final: 'last',
                    label_paginador_inicio: 'first'
                    /*properties paginator globales*/
                },

                acciones_crud: [] = [] as any,
                data: [] = [] as any,
                url_add_item: '',
                header_item: new Set<string>(),
                count_item: ''
            }
        }
    },

    mask: {
        /*properties mask globales*/
        mask_phone: '(0000) 000-0000',
        /*properties mask globales*/
    },

    sms_component: {
        pref_exito: "EXITO: ",
        sms_bienvenida: "bienvenido al systema",
        sms_success_add: "registrado correctamente", 
        sms_success_edit: "editado correctamente" 
    },

    sms_error_component: {
        pref_error: "ERROR: ",
        msg_error_user_login: "usuario o contraseña invalido",
        msg_error_delete_user: "no se ha podido eliminar el usuario",
        msg_error_required: "is required",
        msg_error_invalid: "is invalid",
        msg_error_characters_min: "must be at least 6 characters",
        msg_error_characters_max: "must not exceed 20 characters",
        msg_error_confirm_pass: "does not match"
    },

    text_component: {
        txt_login_credenciales: "por favor, introduzca sus credenciales",
        txt_volver: "volver a inicio"
    },

    label_component: {
        /*label form globales*/
        list_empty: "empty list, no record was found",
        loading: "loading",
        num_item_list: "nº total records",
        actions: 'actions',
        indicate_label: 'indicate',
        selected_label: 'please select',
        store_label: 'store',
        profile_label: 'profile',
        nick_label: 'nick',
        name_label: 'name',
        status_label: 'status',
        lastname_label: 'lastname',
        cellphone_label: 'cellphone',
        phone_label: 'phone',
        quantity_label:'quantity',
        comments_label:'comments',
        cantPhysical_label:"quantity physical", 
        password_label: 'password',
        cpassword_label: 'confirm password',
        email_label: 'email',
        contact_emergency: 'contact emergency',
        cellphone_emergency: 'cellphone emergency',
        emergency_titte_label: 'emergency data',
        image_label: 'image', 
        address_label: 'address',
        price_label: 'price',
        coste_label: 'cost',
        barcode_label: 'bard code',
        producto_label:'product',
        shortName_label: 'short name',        
        optional_image: 'select an image',
        optional_field:"this is an optional field",
        optional_label_form: 'these fields are optional'
        /*label form globales*/
    },
    label_btn: {
        /*label form button globales*/
        btn_login: 'sing in',
        btn_save: 'save',
        btn_cleanup: 'clean up',
        btn_cancel: 'cancel',
        btn_view: 'consult registry',
        btn_add: 'add new record',
        btn_edit: 'edit record',
        btn_delete: 'delete the record',
        btn_back: 'go back'
        /*label form button globales*/
    },

    footer: {
        /*url footer globales*/
        version_app: '1.0.0',
        year_release: '2021',
        url_site_owner: 'www.google.com',
        derechos: "todos los derechos reservados.",
        name_owner_app: 'Talleres Miraflores C.A'
        /*url footer globales*/
    }

}


export const propierties_api = {

    empoint_url: {
        /*url base endpoint*/
        // 'https://talleres-miraflores.herokuapp.com',
        base_ws_url: 'http://localhost:8080',
        /*url base endpoint*/

        /*url endpoint users*/
        endpoint_users: '/user',
        /*url endpoint users*/

        /*url endpoint store*/
        endpoint_store: '/store',
        /*url endpoint store*/

        /*url endpoint users*/
        endpoint_product: '/product',
        /*url endpoint users*/

        /*url endpoint users*/
        endpoint_sale: '/sale',
        /*url endpoint users*/

        /*url endpoint users*/
        endpoint_provider: '/provider',
        /*url endpoint users*/
        
        /*url endpoint users*/
        endpoint_inventory: '/inventory',
        /*url endpoint users*/
 
        /*url endpoint users*/
        endpoint_stock: '/stock',
        /*url endpoint users*/

        /*url endpoint users*/
        endpoint_tag: '/tag',
        /*url endpoint users*/

        /*url endpoint users*/
        endpoint_login: '/user/login',
        /*url endpoint users*/

        /*url endpoint operatives*/
        endpoint_operatives: '/operatives'
        /*url endpoint operatives*/

    }
}
