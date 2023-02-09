import Head from 'next/head'
import { useState, useEffect } from 'react'
import Web3 from 'web3'
import 'bulma/css/bulma.css'
import styles from '../styles/VendingMachine.module.css'
import vendingMachineContract  from '../blockchain/vending'

const VendingMachine = () => 
{
    const[error, setError]= useState('')
    const[successMsg, setSuccessMsg]= useState('')
    const [inventory, setInventory]= useState('')
    const [myDonutCount, setmyDonutCount]= useState('')
    const [buyCount, setBuyCount]= useState('')
    const [web3, setWeb3]= useState(null)
    const [address, setAddress]= useState(null)
    const [vmContract, setVmContract]= useState(null)

    useEffect(() => { 
        if (vmContract) getInventoryHandler()
        if (vmContract && address ) getMyDonutCountHandler()
    }, [vmContract, address])

    const getInventoryHandler = async() => {
        const inventory =  await vmContract.methods.getVendingMachineBalance().call()
        setInventory(inventory)
    }
    const getMyDonutCountHandler= async() =>
    {
        const count =await vmContract.methods.donutBalances(address).call()
        setmyDonutCount(count)
    }
    const updateDonutQty = event =>
    {
        setBuyCount(event.target.value)
    }
    const buyDonutHandler = async () => {
        try {
          await vmContract.methods.purchase(buyCount).send({
            from: address,
            value: web3.utils.toWei('1', 'gwei') * buyCount
          })
          setSuccessMsg("Insurance Purchased!!!")
          if (vmContract) getInventoryHandler()
          if (vmContract && address ) getMyDonutCountHandler()
        }catch(err){
          setError(err.message);
        }
      }
    const connectWalletHandler = async () => {
        if(typeof window !== "undefined" && typeof window.ethereum !=="undefined")
        {
            try{
                //request wallet connect
                await window.ethereum.request({method: "eth_requestAccounts"})
                //set web3 instance
                web3= new Web3(window.ethereum)
                setWeb3(web3)
                const accounts= await web3.eth.getAccounts()
                setAddress(accounts[0])
                //create local contract copy
                const vm = vendingMachineContract(web3)
                setVmContract(vm)
                //get list of accounts
               
            }
            catch(err)
            {
                setError(err.message)
            }
        }
        else
        {
            console.log("Please install metamask")
        }
    }
    return (
        <div className={styles.main}>
            <Head>
            <title>Insurance Portal Demo</title>
            <meta name="description" content="A BLockChain Application" />
            </Head>
            <nav className="navbar mt-5 mb-0.5">
                <div className="container">
                    <div className="navbar-brand">
                        <h1 class="has-text-link, is-family-monospace, has-text-link">Insurance Portal Demo</h1>
                    </div>
                    <div className="navbar-end">
                        <button onClick={connectWalletHandler}className="button is-primary">Connect your Wallet</button>
                    </div>
                </div>
            </nav>

         
            <section class="section is-small, has-background-primary">
        <div class="field">
    <label class="label, has-text-white" >Name</label>
    <div class="control, column is-7">
        <input class="input" type="text" placeholder="Type your Name"/>
    </div>
    </div>

    <div class="field">
    <label class="label, has-text-white" >Username</label>
    <div class="control has-icons-left has-icons-right, column is-7">
        <input class="input is-success" type="text" placeholder="Select username"/>
        <span class="icon is-small is-left">
        <i class="fas fa-user"></i>
        </span>
        <span class="icon is-small is-right">
        <i class="fas fa-check"></i>
        </span>
    </div>
    </div>

    <div class="field">
    <label class="label, has-text-white">Email</label>
    <div class="control has-icons-left has-icons-right, column is-7">
        <input class="input is-danger" type="email" placeholder="Type Email" />
        <span class="icon is-small is-left">
        <i class="fas fa-envelope"></i>
        </span>
        <span class="icon is-small is-right">
        <i class="fas fa-exclamation-triangle"></i>
        </span>
    </div>
    </div>

    <div class="field">
    <label class="label, has-text-white">Select Insurance</label>
    <div class="control, column is-3">
        <div class="select">
        <select>
            <option>Select dropdown</option>
            <option>Property Insurance</option>
            <option>Car Insurance</option>
            <option>Travel Insurance</option>
            <option>Term/Life Insurance</option>
        </select>
        </div>
    </div>
    </div>
    <div class="field">
    <label class="label, has-text-white">Select Period</label>
    <div class="control, column is-4">
        <div class="select">
        <select>
            <option>Select dropdown</option>
            <option>3-Months</option>
            <option>6-Months</option>
            <option>12-Months</option>
            <option>24-Months</option>
            <option>36-Months</option>
        </select>
        </div>
    </div>
    </div>

    <div class="field">
    <label class="label, has-text-white">Select Country</label>
    <div class="control, column is-3">
    <div class="select">
    <select>
    <option selected>Country</option>
    <option value="Afghanistan">Afghanistan</option>
    <option value="Albania">Albania</option>
    <option value="Algeria">Algeria</option>
    <option value="American Samoa">American Samoa</option>
    <option value="Andorra">Andorra</option>
    <option value="Angola">Angola</option>
    <option value="Anguilla">Anguilla</option>
    <option value="Antartica">Antarctica</option>
    <option value="Antigua and Barbuda">Antigua and Barbuda</option>
    <option value="Argentina">Argentina</option>
    <option value="Armenia">Armenia</option>
    <option value="Aruba">Aruba</option>
    <option value="Australia">Australia</option>
    <option value="Austria">Austria</option>
    <option value="Azerbaijan">Azerbaijan</option>
    <option value="Bahamas">Bahamas</option>
    <option value="Bahrain">Bahrain</option>
    <option value="Bangladesh">Bangladesh</option>
    <option value="Barbados">Barbados</option>
    <option value="Belarus">Belarus</option>
    <option value="Belgium">Belgium</option>
    <option value="Belize">Belize</option>
    <option value="Benin">Benin</option>
    <option value="Bermuda">Bermuda</option>
    <option value="Bhutan">Bhutan</option>
    <option value="Bolivia">Bolivia</option>
    <option value="Bosnia and Herzegowina">Bosnia and Herzegowina</option>
    <option value="Botswana">Botswana</option>
    <option value="Bouvet Island">Bouvet Island</option>
    <option value="Brazil">Brazil</option>
    <option value="British Indian Ocean Territory">British Indian Ocean Territory</option>
    <option value="Brunei Darussalam">Brunei Darussalam</option>
    <option value="Bulgaria">Bulgaria</option>
    <option value="Burkina Faso">Burkina Faso</option>
    <option value="Burundi">Burundi</option>
    <option value="Cambodia">Cambodia</option>
    <option value="Cameroon">Cameroon</option>
    <option value="Canada">Canada</option>
    <option value="Cape Verde">Cape Verde</option>
    <option value="Cayman Islands">Cayman Islands</option>
    <option value="Central African Republic">Central African Republic</option>
    <option value="Chad">Chad</option>
    <option value="Chile">Chile</option>
    <option value="China">China</option>
    <option value="Christmas Island">Christmas Island</option>
    <option value="Cocos Islands">Cocos (Keeling) Islands</option>
    <option value="Colombia">Colombia</option>
    <option value="Comoros">Comoros</option>
    <option value="Congo">Congo</option>
    <option value="Congo">Congo, the Democratic Republic of the</option>
    <option value="Cook Islands">Cook Islands</option>
    <option value="Costa Rica">Costa Rica</option>
    <option value="Cota D'Ivoire">Cote d'Ivoire</option>
    <option value="Croatia">Croatia (Hrvatska)</option>
    <option value="Cuba">Cuba</option>
    <option value="Cyprus">Cyprus</option>
    <option value="Czech Republic">Czech Republic</option>
    <option value="Denmark">Denmark</option>
    <option value="Djibouti">Djibouti</option>
    <option value="Dominica">Dominica</option>
    <option value="Dominican Republic">Dominican Republic</option>
    <option value="East Timor">East Timor</option>
    <option value="Ecuador">Ecuador</option>
    <option value="Egypt">Egypt</option>
    <option value="El Salvador">El Salvador</option>
    <option value="Equatorial Guinea">Equatorial Guinea</option>
    <option value="Eritrea">Eritrea</option>
    <option value="Estonia">Estonia</option>
    <option value="Ethiopia">Ethiopia</option>
    <option value="Falkland Islands">Falkland Islands (Malvinas)</option>
    <option value="Faroe Islands">Faroe Islands</option>
    <option value="Fiji">Fiji</option>
    <option value="Finland">Finland</option>
    <option value="France">France</option>
    <option value="France Metropolitan">France, Metropolitan</option>
    <option value="French Guiana">French Guiana</option>
    <option value="French Polynesia">French Polynesia</option>
    <option value="French Southern Territories">French Southern Territories</option>
    <option value="Gabon">Gabon</option>
    <option value="Gambia">Gambia</option>
    <option value="Georgia">Georgia</option>
    <option value="Germany">Germany</option>
    <option value="Ghana">Ghana</option>
    <option value="Gibraltar">Gibraltar</option>
    <option value="Greece">Greece</option>
    <option value="Greenland">Greenland</option>
    <option value="Grenada">Grenada</option>
    <option value="Guadeloupe">Guadeloupe</option>
    <option value="Guam">Guam</option>
    <option value="Guatemala">Guatemala</option>
    <option value="Guinea">Guinea</option>
    <option value="Guinea-Bissau">Guinea-Bissau</option>
    <option value="Guyana">Guyana</option>
    <option value="Haiti">Haiti</option>
    <option value="Heard and McDonald Islands">Heard and Mc Donald Islands</option>
    <option value="Holy See">Holy See (Vatican City State)</option>
    <option value="Honduras">Honduras</option>
    <option value="Hong Kong">Hong Kong</option>
    <option value="Hungary">Hungary</option>
    <option value="Iceland">Iceland</option>
    <option value="India">India</option>
    <option value="Indonesia">Indonesia</option>
    <option value="Iran">Iran (Islamic Republic of)</option>
    <option value="Iraq">Iraq</option>
    <option value="Ireland">Ireland</option>
    <option value="Israel">Israel</option>
    <option value="Italy">Italy</option>
    <option value="Jamaica">Jamaica</option>
    <option value="Japan">Japan</option>
    <option value="Jordan">Jordan</option>
    <option value="Kazakhstan">Kazakhstan</option>
    <option value="Kenya">Kenya</option>
    <option value="Kiribati">Kiribati</option>
    <option value="Democratic People's Republic of Korea">Korea, Democratic People's Republic of</option>
    <option value="Korea">Korea, Republic of</option>
    <option value="Kuwait">Kuwait</option>
    <option value="Kyrgyzstan">Kyrgyzstan</option>
    <option value="Lao">Lao People's Democratic Republic</option>
    <option value="Latvia">Latvia</option>
    <option value="Lebanon" selected>Lebanon</option>
    <option value="Lesotho">Lesotho</option>
    <option value="Liberia">Liberia</option>
    <option value="Libyan Arab Jamahiriya">Libyan Arab Jamahiriya</option>
    <option value="Liechtenstein">Liechtenstein</option>
    <option value="Lithuania">Lithuania</option>
    <option value="Luxembourg">Luxembourg</option>
    <option value="Macau">Macau</option>
    <option value="Macedonia">Macedonia, The Former Yugoslav Republic of</option>
    <option value="Madagascar">Madagascar</option>
    <option value="Malawi">Malawi</option>
    <option value="Malaysia">Malaysia</option>
    <option value="Maldives">Maldives</option>
    <option value="Mali">Mali</option>
    <option value="Malta">Malta</option>
    <option value="Marshall Islands">Marshall Islands</option>
    <option value="Martinique">Martinique</option>
    <option value="Mauritania">Mauritania</option>
    <option value="Mauritius">Mauritius</option>
    <option value="Mayotte">Mayotte</option>
    <option value="Mexico">Mexico</option>
    <option value="Micronesia">Micronesia, Federated States of</option>
    <option value="Moldova">Moldova, Republic of</option>
    <option value="Monaco">Monaco</option>
    <option value="Mongolia">Mongolia</option>
    <option value="Montserrat">Montserrat</option>
    <option value="Morocco">Morocco</option>
    <option value="Mozambique">Mozambique</option>
    <option value="Myanmar">Myanmar</option>
    <option value="Namibia">Namibia</option>
    <option value="Nauru">Nauru</option>
    <option value="Nepal">Nepal</option>
    <option value="Netherlands">Netherlands</option>
    <option value="Netherlands Antilles">Netherlands Antilles</option>
    <option value="New Caledonia">New Caledonia</option>
    <option value="New Zealand">New Zealand</option>
    <option value="Nicaragua">Nicaragua</option>
    <option value="Niger">Niger</option>
    <option value="Nigeria">Nigeria</option>
    <option value="Niue">Niue</option>
    <option value="Norfolk Island">Norfolk Island</option>
    <option value="Northern Mariana Islands">Northern Mariana Islands</option>
    <option value="Norway">Norway</option>
    <option value="Oman">Oman</option>
    <option value="Pakistan">Pakistan</option>
    <option value="Palau">Palau</option>
    <option value="Panama">Panama</option>
    <option value="Papua New Guinea">Papua New Guinea</option>
    <option value="Paraguay">Paraguay</option>
    <option value="Peru">Peru</option>
    <option value="Philippines">Philippines</option>
    <option value="Pitcairn">Pitcairn</option>
    <option value="Poland">Poland</option>
    <option value="Portugal">Portugal</option>
    <option value="Puerto Rico">Puerto Rico</option>
    <option value="Qatar">Qatar</option>
    <option value="Reunion">Reunion</option>
    <option value="Romania">Romania</option>
    <option value="Russia">Russian Federation</option>
    <option value="Rwanda">Rwanda</option>
    <option value="Saint Kitts and Nevis">Saint Kitts and Nevis</option> 
    <option value="Saint LUCIA">Saint LUCIA</option>
    <option value="Saint Vincent">Saint Vincent and the Grenadines</option>
    <option value="Samoa">Samoa</option>
    <option value="San Marino">San Marino</option>
    <option value="Sao Tome and Principe">Sao Tome and Principe</option> 
    <option value="Saudi Arabia">Saudi Arabia</option>
    <option value="Senegal">Senegal</option>
    <option value="Seychelles">Seychelles</option>
    <option value="Sierra">Sierra Leone</option>
    <option value="Singapore">Singapore</option>
    <option value="Slovakia">Slovakia (Slovak Republic)</option>
    <option value="Slovenia">Slovenia</option>
    <option value="Solomon Islands">Solomon Islands</option>
    <option value="Somalia">Somalia</option>
    <option value="South Africa">South Africa</option>
    <option value="South Georgia">South Georgia and the South Sandwich Islands</option>
    <option value="Span">Spain</option>
    <option value="SriLanka">Sri Lanka</option>
    <option value="St. Helena">St. Helena</option>
    <option value="St. Pierre and Miguelon">St. Pierre and Miquelon</option>
    <option value="Sudan">Sudan</option>
    <option value="Suriname">Suriname</option>
    <option value="Svalbard">Svalbard and Jan Mayen Islands</option>
    <option value="Swaziland">Swaziland</option>
    <option value="Sweden">Sweden</option>
    <option value="Switzerland">Switzerland</option>
    <option value="Syria">Syrian Arab Republic</option>
    <option value="Taiwan">Taiwan, Province of China</option>
    <option value="Tajikistan">Tajikistan</option>
    <option value="Tanzania">Tanzania, United Republic of</option>
    <option value="Thailand">Thailand</option>
    <option value="Togo">Togo</option>
    <option value="Tokelau">Tokelau</option>
    <option value="Tonga">Tonga</option>
    <option value="Trinidad and Tobago">Trinidad and Tobago</option>
    <option value="Tunisia">Tunisia</option>
    <option value="Turkey">Turkey</option>
    <option value="Turkmenistan">Turkmenistan</option>
    <option value="Turks and Caicos">Turks and Caicos Islands</option>
    <option value="Tuvalu">Tuvalu</option>
    <option value="Uganda">Uganda</option>
    <option value="Ukraine">Ukraine</option>
    <option value="United Arab Emirates">United Arab Emirates</option>
    <option value="United Kingdom">United Kingdom</option>
    <option value="United States">United States</option>
    <option value="United States Minor Outlying Islands">United States Minor Outlying Islands</option>
    <option value="Uruguay">Uruguay</option>
    <option value="Uzbekistan">Uzbekistan</option>
    <option value="Vanuatu">Vanuatu</option>
    <option value="Venezuela">Venezuela</option>
    <option value="Vietnam">Viet Nam</option>
    <option value="Virgin Islands (British)">Virgin Islands (British)</option>
    <option value="Virgin Islands (U.S)">Virgin Islands (U.S.)</option>
    <option value="Wallis and Futana Islands">Wallis and Futuna Islands</option>
    <option value="Western Sahara">Western Sahara</option>
    <option value="Yemen">Yemen</option>
    <option value="Serbia">Serbia</option>
    <option value="Zambia">Zambia</option>
    <option value="Zimbabwe">Zimbabwe</option>
    </select>

    </div>
    </div>
    </div>

    <div class="field">
    <label class="label, has-text-white">Address</label>
    <div class="control, column is-7">
        <textarea class="textarea" placeholder="Textarea"></textarea>
    </div>
    </div>

    <div class="field">
    <div class="control">
        <label class="checkbox, has-text-white">
        <input type="checkbox"/>
        I agree to the <a href="#">Terms and conditions</a>
        </label>
    </div>
    </div>

    <div class="field">
    <div class="control">
        <label class="radio, has-text-white">
        <input type="radio" name="question"/>
        Yes
        </label>
        <label class="radio, has-text-white">
        <input type="radio" name="question"/>
        No
        </label>
    </div>
    </div>

    <div class="field is-grouped">
    <div class="control">
        <button class="button is-link" onClick={buyDonutHandler} className="button is-primary is-outlined mt-4,">Buy Now</button>
    </div>
    </div>
   
                
    <div className="container, mt-5">
            <h2 class="has-text-white">Total Insurance Services: {inventory}</h2>
                </div>
                <div className="container, mt-2">
                    <h2 class="has-text-white"> Insurance Count: {myDonutCount}</h2>
                </div>
            <section >
                <div className="container, mt-2">
                    <div className="field">
                        <label class="label, has-text-white"> Buy Insurance:</label>
                        <div className="control, mt-3">
                            <input onChange={updateDonutQty} class="input is-small" classname="input" type ="type" placeholder="Enter the Insurance amount"/>
                        </div>
                        <button class="button is-link" onClick={buyDonutHandler} className="button is-primary is-outlined mt-4,">Buy Now</button>
                    </div>

                </div>
            </section>
            </section>
            <section>
                <div className="container has-text-danger">
                    <p>{error}</p>
                </div>
            </section>
            <section>
                <div className="container has-text-success">
                    <p>{successMsg}</p>
                </div>
            
            </section>
        </div>
    )
}

export default VendingMachine;