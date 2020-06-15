<div class="flex-grow-overflow px-5">
    <div class="text-center py-3">
        <h2>Step 1: Choose a template</h2>
        <div class="col-lg-9 col-12 mx-auto">
            <div class="template-shadow p-2">
                <div id="selectedTemplate" class="selected-template">
                    <div class="template-text apply-font">
                        John Doe
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="py-3">
        <h2 class="text-center">Step 2: Enter the names</h2>
        <div class="col-lg-9 col-12 mx-auto p-0">
        <div class="container">
            <div class="row">
                <div class="col-lg-5 col-md-6 col-12">
                    <textarea name="names" class="form-control" rows="10" placeholder="Enter the names separated by different lines"></textarea>
                </div>
                <div class="col-lg-7 col-md-6 col-12 py-2">
                    <h5>Choose the font and color of the text that you need to use in your templates</h5>
                    <div class="form-group row">
                        <label for="font" class="col-sm-auto col-form-label">Font:</label>
                        <div class="col-sm d-flex align-items-center">
                            <div id="font-picker"></div>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="colorPicker" class="col-sm-auto col-form-label">Color:</label>
                        <div class="col-sm d-flex align-items-center">
                            <input type="color" id="colorPicker" name="colorPicker" value="#000000">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    </div>
</div>