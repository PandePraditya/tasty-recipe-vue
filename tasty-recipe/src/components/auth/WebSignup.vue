<script setup>
    import BaseInput from '../ui/BaseInput.vue';
    import BaseButton from '../ui/BaseButton.vue';
    import { reactive, ref } from 'vue';
    import { useStore } from 'vuex';
    import { useRouter } from 'vue-router';

    const store = useStore();
    const router = useRouter();

    const signupData = reactive({
        firstname: "",
        lastname: "",
        username: "",
        email: "",
        password: "",
        confirmationPassword: "",
        isLoginL: false,
        imageLink: "",
    });

    const passwordStatusDisplay = ref("none");
    const passwordCheck = () => {
        if (signupData.password.length < 8) {
            passwordStatusDisplay.value = "block"
        } else {
            passwordStatusDisplay.value = "none"
        }
    }

    const confirmationPasswordDoesNotMatch = ref("none");
    const confirmationPasswordMatch = ref("none");

    const confirmationPasswordCheck = () => {
        if (signupData.confirmationPassword === "") {
            confirmationPasswordDoesNotMatch.value = "none"
            confirmationPasswordMatch.value = "none"
            return;
        } 
        
        if (signupData.password !== signupData.confirmationPassword) {
            confirmationPasswordDoesNotMatch.value = "block"
            confirmationPasswordMatch.value = "none"
            return;
        } 

        confirmationPasswordDoesNotMatch.value = "none"
        confirmationPasswordMatch.value = "block"
    }

    const checkImage = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.addEventListener("load", () => {
            signupData.imageLink = reader.result;
        });
    };

    const register = async () => {
        if ( signupData.password !== signupData.confirmationPassword || signupData.password.length < 8 ) {
            signupData.confirmationPassword = "";
            signupData.password = "";
            confirmationPasswordDoesNotMatch.value = "none";
            confirmationPasswordMatch.value = "none";
        } else {
            await store.dispatch("auth/getRegisterData", signupData);
            router.push("/");
        }
    };

</script>

<template>
    <div class="container-fluid py-5 mt-5" style="background-color: #f5f5f5">
        <div style="background-color: #ffffff" class="p-5 m-auto signup-form">
            <div class="text-center">
                <img src="../../assets/images/Logo.png" alt="Logo" />
                <h2 class="mt-4">Create your account</h2>
                <p>Enter your details to use all the app features.</p>
            </div>
            <form class="mt-3" @submit.prevent="register"> <!-- prevent berguna untuk mencegah reload halaman saat di submit -->
                <div class="row">
                    <!-- Firstname & Lastname -->
                    <div class="col-md-6">
                        <base-input type="text" identity="firstname" placeholder="Ex: Jack" label="Firstname" v-model="signupData.firstname">
                        </base-input>
                    </div>
                    <div class="col-md-6">
                        <base-input type="text" identity="lastname" placeholder="Ex: Smith" label="Lastname" v-model="signupData.lastname">
                        </base-input>
                    </div>
                </div>
                <!-- Username -->
                <div class="my-4">
                    <base-input type="username" identity="username" placeholder="Ex: johndoe" label="Username" v-model="signupData.username">
                    </base-input>
                </div>
                <!-- Email -->
                <div class="my-4">
                    <base-input type="email" identity="email" placeholder="Ex: 0fXU8@example.com" label="Email" v-model="signupData.email">
                    </base-input>
                </div>
                <!-- Password -->
                <div class="my-4">
                    <base-input type="password" identity="password" placeholder="Ex: ******" label="Password" v-model="signupData.password" @keyInput="passwordCheck">
                    </base-input>
                    <p class="text-danger mt-1 fw-semibold" style="font-size: 11px;" :style="{ display: passwordStatusDisplay }">
                        The password field must be at least 8 characters long.
                    </p>
                </div>
                <!-- Confirm Password -->
                <div class="my-4">
                    <base-input type="password" identity="confirmpassword" placeholder="Ex: Same with Password" label="Confirm Password" v-model="signupData.confirmationPassword" @keyInput="confirmationPasswordCheck">
                    </base-input>
                    <p class="text-danger mt-1 fw-semibold" style="font-size: 11px;" :style="{ display: confirmationPasswordDoesNotMatch }">
                        The password confirmation does not match
                    </p>
                    <p class="text-success mt-1 fw-semibold" style="font-size: 11px;" :style="{ display: confirmationPasswordMatch }">
                        The password confirmation does match
                    </p>
                </div>
                <div class="my-4">
                    <base-input type="file" identity="recipeImage" label="Profile Photo" isImage="true" @input="checkImage">
                        <div>
                            <div class="border p-1 mt-2 rounded-circle">
                                <img :src="signupData.imageLink" class="rounded-circle" width="140" height="150" style="object-fit: cover;" alt="">
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
