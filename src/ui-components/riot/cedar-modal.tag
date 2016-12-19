<cedar-modal>
	<div id="cedarModal">
        <div id="modal" class="modal" tabindex="-1" role="dialog" keyup={} >
            <div class="modal-dialog" role="document">
                <div class="card-block modal-content">
                    <yield/>
                    <button class="btn btn-primary" id="modalCloseBtn" onclick={ this.hideModal }>Close</button>
                </div>
            </div>
        </div>
        <button class="btn btn-primary" onclick={ this.showModal } id="modalOpen">Show Modal</button>
    </div>
    <script>
        var focusableItems = new Array();
        this.on( 'mount', function() {
            setupModal();
        } );
        
        function setupModal() {
            // TODO can i give the modal focus on showing then bind the keyup event to the modal instead of the document
            // easier removal of the event listener then...
            document.addEventListener('keyup', function (e) {
                if (e.keyCode === 27) { // close with esc
                    keyHideModal();
                }
            });

            var modal = document.getElementById('modal');
            var modalIndex = 0;
            var modalContent = document.querySelector('.modal-content');
            var modalContentChildren = modalContent.children;
            for ( var i = 0; i < modalContentChildren.length; i++ ) {
                if ( modalContentChildren[ i ].tagName === 'A' || modalContentChildren[ i ].tagName === 'BUTTON' ) {
                    focusableItems.push( modalContentChildren[ i ] );
                }
                
                if ( modalContentChildren[ i ].children.length > 0 ) {
                    for ( var j = 0; j <  modalContentChildren[ i ].children.length; j++ ) {
                        var node = modalContentChildren[ i ].children[ j ]
                        if ( node.tagName === 'A' || node.tagName === 'BUTTON' ) { 
                            focusableItems.push( node );
                        }
                    }
                }
            }
            modal.addEventListener('keydown', function(e) {
                if (e.keyCode === 9) {
                    if ( !e.shiftKey ) {
                        if ( modalIndex < ( focusableItems.length - 1 ) ) {
                            modalIndex++;
                        } else {
                            modalIndex = 0;
                        }
                    } else if ( e.shiftKey ) {
                        if ( modalIndex > 0 ) {
                            modalIndex--;
                        } else {
                            modalIndex = (focusableItems.length - 1);
                        }
                    }

                    focusableItems[modalIndex].focus();
                    event.preventDefault()
                }
            } );
        }

        showModal() {
            var body = document.querySelector('body');
            var modal = document.getElementById('modal');
            var modalBackdrop = document.createElement('div');
            modalBackdrop.id = 'modalBackdrop';
            modalBackdrop.classList.add('modal-backdrop', 'fade', 'in');
            modalBackdrop.tabindex = -1;            
            body.appendChild(modalBackdrop);
            body.classList.add('modal-open');  // prevent body scrolling
            modal.classList.add('show');
            modal.focus();
            modalIndex = 0;
            focusableItems[modalIndex].focus();
        }

        hideModal() {
            jsFriendlyHideModal();
        }
        function keyHideModal() {
            jsFriendlyHideModal();
        }
        function jsFriendlyHideModal () {
            var body = document.querySelector('body');
            body.classList.remove('modal-open');
            var modalBackdrop = document.getElementById('modalBackdrop');
            body.removeChild(modalBackdrop);
            var modal = document.getElementById('modal');
            modal.classList.remove('show');
            var modalLaunchId = document.getElementById('modalOpen');
            modalLaunchId.focus();
        }
        
        
    </script>
</cedar-modal>
