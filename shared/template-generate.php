<div class="flex-grow-overflow px-5">
    <div class="text-center py-3">
        <h2>Step 1: Choose a template</h2>
        <div class="col-lg-9 col-12 mx-auto">
            <div class="template-shadow p-2">
                <?php include "shared/template-preview.php" ?>
           </div>
        </div>
    </div>
    <section class="py-3">
        <h2 class="text-center">Step 2: Enter the names</h2>
        <div class="col-lg-9 col-12 mx-auto p-0">
            <div class="container">
                <div class="row">
                    <div class="col-lg-5 col-md-6 col-12">
                        <textarea name="names" id="templateNames" class="form-control" rows="10" placeholder="Enter the names separated by different lines"></textarea>
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
                        <button type="button" class="btn btn-primary preview-template">Preview</button>
                        <div class="alert alert-warning mt-3 text-center d-none break-long-word" id="namesError" role="alert"></div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <section class="py-3 d-none" id="templatesPreview">
        <h2 class="text-center">Step 3: Preview of Templates</h2>
        <div class="text-center my-2">
            <button type="button" class="btn btn-success" data-toggle="modal" data-target="#pdfGenerateModal">
                Download PDF
            </button>
            <div class="modal fade" id="pdfGenerateModal" tabindex="-1" role="dialog" aria-labelledby="pdfGenerateModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Ready to Print?</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body text-left">
                            <div class="form-group">Enter your email address to get access to your printable PDF.</div>
                            <div class="form-group row">
                                <label for="staticEmail" class="col-sm-2 col-form-label">Email</label>
                                <div class="col-sm-10">
                                    <input type="text" placeholder="you@example.com" class="form-control" id="staticEmail">
                                </div>
                            </div>
                            <div class="form-group row">
                                <div class="col-sm-2"></div>
                                <div class="col-sm-10">
                                    <div class="alert alert-success d-none" role="alert" id="emailSuccess">
                                        Email sent successfully
                                    </div>
                                    <div class="alert alert-warning d-none" role="alert" id="emailError">
                                        Error occured while sending the email. Please check the email or try again later.
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-success generate-templates" disabled>Get my cards!</button>
                            <button type="button" class="btn btn-light" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-lg-9 col-12 mx-auto p-0">
            <div id="generatedTemplates" 
            class="d-flex flex-wrap justify-content-around
             justify-content-center align-items-center
              h-100 border template-shadow"
            style="min-height:50vh;">
                <template id="templatePreviewHtmlTemplate">
                    <div class="template-preview p-2 my-1 w-100">
                        <?php include "shared/template-preview.php" ?>
                    </div>
                </template>
            </div>
        </div>
    </section>
</div>