import{j as e,k as t,l as a,m as l,h as r,n,t as o,p as s,q as i,w as d,_ as u,u as m,b as c,v as p,o as f,c as g,x as h,F as b,N as v,e as y,y as w,z as x,g as V}from"./index-7a41b293.js";import{C as _}from"./index-699550bc.js";import{F as B}from"./index-3120b205.js";import"./use-id-1ac3f19f.js";const[S,P]=e("form");const k=d(t({name:S,props:{colon:Boolean,disabled:Boolean,readonly:Boolean,showError:Boolean,labelWidth:n,labelAlign:String,inputAlign:String,scrollToError:Boolean,validateFirst:Boolean,submitOnEnter:o,showErrorMessage:o,errorMessageAlign:String,validateTrigger:{type:[String,Array],default:"onBlur"}},emits:["submit","failed"],setup(e,{emit:t,slots:n}){const{children:o,linkChildren:d}=a(i),u=e=>e?o.filter((t=>e.includes(t.name))):o,m=t=>{return"string"==typeof t?(e=>{const t=o.find((t=>t.name===e));return t?new Promise(((e,a)=>{t.validate().then((t=>{t?a(t):e()}))})):Promise.reject()})(t):e.validateFirst?(a=t,new Promise(((e,t)=>{const l=[];u(a).reduce(((e,t)=>e.then((()=>{if(!l.length)return t.validate().then((e=>{e&&l.push(e)}))}))),Promise.resolve()).then((()=>{l.length?t(l):e()}))}))):(e=>new Promise(((t,a)=>{const l=u(e);Promise.all(l.map((e=>e.validate()))).then((e=>{(e=e.filter(Boolean)).length?a(e):t()}))})))(t);var a},c=(e,t)=>{o.some((a=>a.name===e&&(a.$el.scrollIntoView(t),!0)))},p=()=>o.reduce(((e,t)=>(void 0!==t.name&&(e[t.name]=t.formValue.value),e)),{}),f=()=>{const a=p();m().then((()=>t("submit",a))).catch((l=>{t("failed",{values:a,errors:l}),e.scrollToError&&l[0].name&&c(l[0].name)}))},g=e=>{s(e),f()};return d({props:e}),l({submit:f,validate:m,getValues:p,scrollToField:c,resetValidation:e=>{"string"==typeof e&&(e=[e]);u(e).forEach((e=>{e.resetValidation()}))},getValidationStatus:()=>o.reduce(((e,t)=>(e[t.name]=t.getValidationStatus(),e)),{})}),()=>{var e;return r("form",{class:P(),onSubmit:g},[null==(e=n.default)?void 0:e.call(n)])}}})),I={style:{margin:"20px 40px"}},T=u({__name:"Login",setup(e){const{reactive:t,ref:a,onUnmounted:l,API:n,router:o,route:s,showSuccessToast:i,showFailToast:d,utils:u}=m(),S=c(),P=a(null),T=t({phone:"",code:"",btn:{disabled:!1,text:"发送验证码"}});let j=null,A=30;const E=async()=>{try{await P.value.validate("phone");let{code:e}=await n.userSendCode(T.phone);if(0==+e)return T.btn.disabled=!0,T.btn.text="30s后重发",void(j=setInterval((()=>{if(1===A)return clearInterval(j),A=30,T.btn.disabled=!1,void(T.btn.text="发送验证码");A--,T.btn.text=`${A}s后重发`}),1e3));d("发送失败，稍后再试")}catch(e){}};l((()=>clearInterval(j)));const F=async()=>{try{await P.value.validate();let{code:e,token:t}=await n.userLogin(T.phone,T.code);if(0!=+e)return void d("登录失败，请稍后再试");u.storage.set("TK",t),await S.queryProfile(),i("登录成功");let a=s.query.target;a?o.replace(a):o.push("/")}catch(e){}};return(e,t)=>{const a=v,l=p("button-again"),n=B,o=_,s=p("ButtonAgain"),i=k;return f(),g(b,null,[r(a,{title:"登录/注册"}),r(i,{ref_key:"formIns",ref:P,"validate-first":""},{default:h((()=>[r(o,{inset:""},{default:h((()=>[r(n,{center:"",label:"手机号","label-width":"50px",name:"phone",modelValue:y(T).phone,"onUpdate:modelValue":t[0]||(t[0]=e=>y(T).phone=e),modelModifiers:{trim:!0},rules:[{required:!0,message:"手机号是必填项"},{pattern:/^(?:(?:\+|00)86)?1\d{10}$/,message:"手机号格式不正确"}]},{button:h((()=>[r(l,{class:"form-btn",size:"small",type:"primary","loading-text":"处理中",disabled:y(T).btn.disabled,onClick:E},{default:h((()=>[w(x(y(T).btn.text),1)])),_:1},8,["disabled"])])),_:1},8,["modelValue"]),r(n,{label:"验证码","label-width":"50px",name:"code",modelValue:y(T).code,"onUpdate:modelValue":t[1]||(t[1]=e=>y(T).code=e),modelModifiers:{trim:!0},rules:[{required:!0,message:"验证码是必填项"},{pattern:/^\d{6}$/,message:"验证码格式不正确"}]},null,8,["modelValue"])])),_:1}),V("div",I,[r(s,{round:"",block:"",type:"primary","loading-text":"正在处理中...",onClick:F},{default:h((()=>[w(" 立即登录/注册 ")])),_:1})])])),_:1},512)],64)}}},[["__scopeId","data-v-02293a5a"]]);export{T as default};
