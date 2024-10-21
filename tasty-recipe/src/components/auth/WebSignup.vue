<script setup>
    import BaseInput from '../ui/BaseInput.vue';
    import BaseButton from '../ui/BaseButton.vue';
</script>

<template>
    <div class="container-fluid py-5 mt-5" style="background-color: #f5f5f5">
        <div style="background-color: #ffffff" class="p-5 m-auto signup-form">
            <div class="text-center">
                <img src="../../assets/images/Logo.png" alt="Logo" />
                <h2 class="mt-4">Create your account</h2>
                <p>Enter your details to use all the app features.</p>
            </div>
            <form class="mt-3">
                <div class="row">
                    <div class="col-md-6">
                        <base-input type="text" identity="firstname" placeholder="Ex: Jack" label="Firstname">
                        </base-input>
                    </div>
                    <div class="col-md-6">
                        <base-input type="text" identity="lastname" placeholder="Ex: Smith" label="Lastname">
                        </base-input>
                    </div>
                </div>
                <div class="my-4">
                    <base-input type="email" identity="email" placeholder="Ex: 0fXU8@example.com" label="Email">
                    </base-input>
                </div>
                <div class="my-4">
                    <base-input type="password" identity="password" placeholder="Ex: ******" label="Password">
                    </base-input>
                </div>
                <div class="my-4">
                    <base-input type="password" identity="confirmpassword" placeholder="Ex: Same with Password" label="Confirm Password">
                    </base-input>
                </div>
                <div class="my-4">
                    <base-input type="file" identity="recipeImage" label="Profile Photo" isImage="true">
                        <div>
                            <div class="border p-1 mt-2 rounded-circle">
                                <img src="../../assets/images/User.png" class="rounded-circle" width="140" height="150" style="object-fit: cover;" alt="">
                            </div>
                            <div class="text-center" style="transform: translateY(-24px);">
                                <i class="fa-solid fa-camera fs-5 p-2 rounded-circle bg-white"></i>
                            </div>
                        </div>
                    </base-input>
                </div>
                <base-button class="login w-100 my-3">Register</base-button>
            </form>
            <div class="text-center mt-4">
                <p class="fw-semibold">
                    Already have an account?
                    <router-link to="/login" style="color: #4c4ddc" class="text-decoration-none">
                        Login
                    </router-link>
                </p>
            </div>
        </div>
    </div>
</template>
