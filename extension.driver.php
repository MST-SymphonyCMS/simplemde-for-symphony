<?php

	Class extension_simple_mde_for_symphony extends Extension{

		public function getSubscribedDelegates(){
			return array(
				array(
					'page'     => '/backend/',
					'delegate' => 'InitaliseAdminPageHead',
					'callback' => 'appendAssets'
				),
			);
		}

	/*-------------------------------------------------------------------------
		Delegates:
	-------------------------------------------------------------------------*/

    public function appendAssets()
    {
        $callback = Symphony::Engine()->getPageCallback();

        if ($callback['driver'] == 'publish' && $callback['context']['page'] !== 'index') {
            Administration::instance()->Page->addStylesheetToHead(URL . '/extensions/simple_mde_for_symphony/assets/simplemde.min.css');
            Administration::instance()->Page->addStylesheetToHead(URL . '/extensions/simple_mde_for_symphony/assets/simplemde.publish.css');
            Administration::instance()->Page->addScriptToHead(URL . '/extensions/simple_mde_for_symphony/assets/simplemde.min.js');
            Administration::instance()->Page->addScriptToHead(URL . '/extensions/simple_mde_for_symphony/assets/simplemde.publish.js');
        }
    }

	}
