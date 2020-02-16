# Android Saripaar 注解详解

## 写这篇文章的原因
在移动端一般很少使用复杂的表单，一般针对于属性的更改都会打开一个新的页面进行更改。虽然不多，但是也会有。如果一个页面要输入的内容包括姓名、地址、邮箱、手机号等，对各个属性的验证会非常麻烦，并且非常的不优雅。

于是，`saripaar`就出现了，一种基于规则的`Android UI`输入验证库，通过注解即可标注验证规则。

使用过程中发现只有四个字：**简单好用**。但是[官方](https://github.com/ragunathjawahar/android-saripaar)对注解的使用并没有一份完整的文档，故参考源码整理了现有的所有注解（基于版本`2.0.3`）。
 
## 如何使用

### 导入依赖
第一步当然是导入依赖啦，可通过`implementation 'com.mobsandgeeks:android-saripaar:(latest version)'`导入`saripaar`，将`(latest version)`替换为最新版本即可。

### 使用注解
对需要进行验证的`可输入View`加上注解来标注验证规则，例
```java
@Length(min = 6, max = 9)
private AppCompatEditText et1;
```
该注解表示`et1`中的输入内容长度只能在6到9的闭区间。

### 实例化`Validator`
```java
mValidator = new Validator(this);
mValidator.setValidationListener(this);
```
`Validator`负责验证给定容器中的`View`，通常容器为`Activity`或`Fragment`。但也可以用包含`View`的其他类作为容器。

### 实现`ValidationListener`
```java
public class MainActivity extends AppCompatActivity implements Validator.ValidationListener {

    // Code…

    @Override
    public void onValidationSucceeded() {
        Toast.makeText(this, "成功了！", Toast.LENGTH_LONG).show();
    }

    @Override
    public void onValidationFailed(List<ValidationError> errors) {
        Toast.makeText(this, "失败了！", Toast.LENGTH_LONG).show();
    }
}
```
`ValidationListener`用户监听回调结果，并进行相应的处理。

### 调用验证方法
```java
btn.setOnClickListener(new View.OnClickListener() {
    @Override
    public void onClick(View v) {
        mValidator.validate();
    }
});
```
其余的高级用法在此不做介绍，该文章主要介绍各个注解的使用。

## 注解

### `@AssertFalse`

#### 描述
用于判断输入内容是否为`false`。

#### 作用范围
+ `CheckBox`
+ `RadioButton`
+ `RadioGroup`

#### 参数
+ `sequence`：确定规则的判定顺序，当单个`View`有多个规则时生效
+ `messageResId`：错误提示文字的资源文件ID
+ `message`：错误提示文字  
**注：所有注解均有这三个参数，故之后注解省略不写**

----

### `@AssertTrue`

#### 描述
用于判断输入内容是否为`true`。

#### 作用范围
+ `CheckBox`
+ `RadioButton`
+ `RadioGroup`

----

### `@Checked`

#### 描述
用于判断输入内容是否为预设值，默认预设值为`true`。

#### 作用范围
+ `CheckBox`
+ `RadioButton`
+ `RadioGroup`

#### 参数
+ `value`：用于设置预设值，默认为`true`

----

### `@ConfirmEmail`

#### 描述
判断当前输入内容与被`@Email`注解的`View`的内容是否一致。
**注：当前容器所持有的被`@Email`注解的`View`必须且只允许有一个。**

#### 作用范围
+ `TextView`

----

### `@ConfirmPassword`

#### 描述
判断当前输入内容与被`@Password`注解的`View`的内容是否一致。
**注：当前容器所持有的被`@Password`注解的`View`必须且只允许有一个。**

#### 作用范围
+ `TextView`

----

### `@CreditCard`

#### 描述
判断输入内容是否符合信用卡卡号规则。

#### 作用范围
+ `TextView`

#### 参数
+ `cardTypes`：是一个数组，用于确定信用卡的类型，每种类型对应着不同的正则表达式
    + `Type.AMEX`，美国运通卡，对应着`^(3[47]\d{13})$`
    + `Type.DINERS`，大莱信用卡，对应着`^(30[0-5]\d{11}|3095\d{10}|36\d{12}|3[8-9]\d{12})$`
    + `Type.DISCOVER`，发现卡，对应着`^(6011\d{12})$`、`^(64[4-9]\d{13})$`和`^(65\d{14})$`
    + `Type.MASTERCARD`，万事达卡，对应着`^(5[1-5]\d{14})$`
    + `Type.VISA`，签证卡，对应着`^(4)(\d{12}|\d{15})$`
    + `Type.NONE`，不允许任何内置的信用卡，适用于自定义信用卡类型

----

### `@DecimalMax`

#### 描述
限制输入内容的最大值，输入内容会被强转为`Double`类型，若输入文字不符合`Double`类型，会报`ConversionException`异常。

#### 作用范围
+ `TextView`

#### 参数
+ `value`：`double`类型，最大值。

----

### `@DecimalMin`

#### 描述
限制输入内容的最小值，输入内容会被强转为`Double`类型，若输入文字不符合`Double`类型，会报`ConversionException`异常。

#### 作用范围
+ `TextView`

#### 参数
+ `value`：`double`类型，最小值。

----

### `@Digits`

#### 描述
判断输入内容是否为数字，可定义整数部分以及小数部分的最大位数。

#### 作用范围
+ `TextView`

#### 参数
+ `integer`：整数部分最大位数
+ `fraction`：小数部分最大位数  
**注：输入内容需满足正则  
`String.format("(\\d{0,%d})(\\.\\d{1,%d})?", integer, fraction);`**

----

### `@Domain`

#### 描述
判断输入内容是否是一个有效的域名。

#### 作用范围
+ `TextView`

#### 参数
+ `allowLocal`：本地地址是否有效，默认为`false`

----

### `@Email`

#### 描述
判断输入内容是否是一个有效的邮箱地址。

#### 作用范围
+ `TextView`

#### 参数
+ `allowLocal`：本地地址是否有效，默认为`false`

----

### `@Future`

#### 描述
判断输入的时间是否是未来时间（与当前时间相比）。输入的时间必须满足相应的格式。

#### 作用范围
+ `TextView`

#### 参数
+ `dateFormat`：时间的格式，默认为`dd-MM-yyyy`，以下为`saripaar`提供的格式（可自定义）
    + `DateFormats.DMY`：`dd-MM-yyyy`
    + `DateFormats.YMD`：`yyyy-MM-dd`
    + `DateFormats.MDY`：`MM-dd-yyyy`
    + `DateFormats.DMY_TIME_12_HOURS`：`dd-MM-yyyy hh:mm aa`
    + `DateFormats.YMD_TIME_12_HOURS`：`yyyy-MM-dd hh:mm aa`
    + `DateFormats.MDY_TIME_12_HOURS`：`MM-dd-yyyy hh:mm aa`
    + `DateFormats.DMY_TIME_24_HOURS`：`dd-MM-yyyy kk:mm`
    + `DateFormats.YMD_TIME_24_HOURS`：`yyyy-MM-dd kk:mm`
    + `DateFormats.MDY_TIME_24_HOURS`：`MM-dd-yyyy kk:mm`
+ `dateFormatResId`：时间格式的资源ID 

----

### `@IpAddress`

#### 描述
判断输入的内容是否是一个`IP`，`IPv4`或`IPv6`

#### 作用范围
+ `TextView`

----

### `@Isbn`

#### 描述
判断输入的内容是否是一个`Isbn`，即[国际标准书号](https://zh.wikipedia.org/wiki/国际标准书号)。

#### 作用范围
+ `TextView`

----

### `@Length`

#### 描述
限制输入内容的文本长度，可自定义最大长度和最小长度。

#### 作用范围
+ `TextView`

#### 参数
+ `min`：文本的最小长度，默认为`Integer.MIN_VALUE`
+ `max`：文本的最大长度，默认为`Integer.MAX_VALUE`
+ `trim`：是否需要先做`trim`操作，默认为`false`

----

### `@Max`

#### 描述
限制输入内容的最大值，输入内容会被强转为`Integer`类型，若输入文字不符合`Integer`类型，会报`ConversionException`异常。

#### 作用范围
+ `TextView`

#### 参数
+ `value`：`int`类型，最大值。

----

### `@Min`

#### 描述
限制输入内容的最小值，输入内容会被强转为`Integer`类型，若输入文字不符合`Integer`类型，会报`ConversionException`异常。

#### 作用范围
+ `TextView`

#### 参数
+ `value`：`int`类型，最小值。

----

### `@NotEmpty`

#### 描述
判断输入内容是否非空。

#### 作用范围
+ `TextView`

#### 参数
+ `trim`：判断之前是否要先`trim`，默认为`false`
+ `emptyText`：设置“空字符串”，可自定义一段文本，当输入此文本是则为空
+ `emptyTextResId`：设置“空字符串”的资源文件

----

### `@Order`

#### 描述
确定校验字段的顺序。当一个容器有多个`View`需要检验时，可通过该注解确定校验顺序。

#### 作用范围
+ `TextView`
+ `CheckBox`
+ `RadioButton`
+ `RadioGroup`
+ `Spinner`

#### 参数
+ `value`：`int`类型，用于确定顺序

----

### `@Password`

#### 描述
用于校验文本是否符合密码的规则。

#### 作用范围
+ `TextView`

#### 参数
+ `min`：最小字符数，默认为6
+ `scheme`：`Scheme`类型，利用正则确定密码的输入格式，只能为`Scheme`类型，不可自定义，默认为`Password.Scheme.ANY`
    + `Password.Scheme.ANY`：`.+`
    + `Password.Scheme.ALPHA`：`\w+`
    + `Password.Scheme.ALPHA_MIXED_CASE`：`(?=.*[a-z])(?=.*[A-Z]).+`
    + `Password.Scheme.NUMERIC`：`\d+`
    + `Password.Scheme.ALPHA_NUMERIC`：`(?=.*[a-zA-Z])(?=.*[\d]).+`
    + `Password.Scheme.ALPHA_NUMERIC_MIXED_CASE`：`(?=.*[a-z])(?=.*[A-Z])(?=.*[\d]).+`
    + `Password.Scheme.ALPHA_NUMERIC_SYMBOLS`：`(?=.*[a-zA-Z])(?=.*[\d])(?=.*([^\w])).+`
    + `Password.Scheme.ALPHA_NUMERIC_MIXED_CASE_SYMBOLS`：`(?=.*[a-z])(?=.*[A-Z])(?=.*[\d])(?=.*([^\w])).+`

----

### `@Past`

#### 描述
判断输入的时间是否是过去时间（与当前时间相比）。输入的时间必须满足相应的格式。

#### 作用范围
+ `TextView`

#### 参数
+ `dateFormat`：时间的格式，默认为`dd-MM-yyyy`，以下为`saripaar`提供的格式（可自定义）
    + `DateFormats.DMY`：`dd-MM-yyyy`
    + `DateFormats.YMD`：`yyyy-MM-dd`
    + `DateFormats.MDY`：`MM-dd-yyyy`
    + `DateFormats.DMY_TIME_12_HOURS`：`dd-MM-yyyy hh:mm aa`
    + `DateFormats.YMD_TIME_12_HOURS`：`yyyy-MM-dd hh:mm aa`
    + `DateFormats.MDY_TIME_12_HOURS`：`MM-dd-yyyy hh:mm aa`
    + `DateFormats.DMY_TIME_24_HOURS`：`dd-MM-yyyy kk:mm`
    + `DateFormats.YMD_TIME_24_HOURS`：`yyyy-MM-dd kk:mm`
    + `DateFormats.MDY_TIME_24_HOURS`：`MM-dd-yyyy kk:mm`
+ `dateFormatResId`：时间格式的资源ID 

----

### `@Pattern`

#### 描述
判断输入的内容是否满足正则表达式。

#### 作用范围
+ `TextView`

#### 参数
+ `regex`：正则表达式
+ `caseSensitive`：是否区分大小写

----

### `@Select`

#### 描述
判断选择的索引是否等于默认值，如果不等于则通过，默认值为0。

#### 作用范围
+ `Spinner`

#### 参数
+ `defaultSelection`：设置默认值

----

### `@Url`

#### 描述
判断输入的内容是否是一个`url`。

#### 作用范围
+ `TextView`

#### 参数
+ `schemes`：是一个数组，`url`的协议数组，可自定义，默认为`{"http", "https", "ftp"}`
+ `allowFragments`：`url`片段是否允许通过，默认为`true`

----

### 对于`@Optional`和`@Or`
虽然该版本已经有了这两个注解，但是并不能使用，参考作者在`stackoverflow`上的[回复](https://stackoverflow.com/questions/33403080/android-saripaar-v2-or-annotation)，注解将会在`2.1.0`版本上线
![](https://he_jhua.gitee.io/image-hosting/2019/12/02/1-1.png)

## 总结
本篇文章简单介绍了`Android Saripaar`的用法，并着重列举了各个注解的作用以及各个参数的意思，方便以后的查询。

通过阅读源码对`saripaar`有了更深的认识，并对基于注解的框架有了一个完备的认知。

以后如果有时间的话总结一下`Android Saripaar`实现的细节。